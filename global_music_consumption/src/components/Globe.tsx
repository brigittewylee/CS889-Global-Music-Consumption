import { Box } from "@mui/material";
import Papa from "papaparse";
import { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const includedCountries = {
  "AE": "United Arab Emirates",
  "AO": "Angola",
  "AR": "Argentina",
  "AT": "Austria",
  "AU": "Australia",
  "BE": "Belgium",
  "BG": "Bulgaria",
  "BO": "Bolivia",
  "BR": "Brazil",
  "BY": "Belarus",
  "CA": "Canada",
  "CH": "Switzerland",
  "CL": "Chile",
  "CM": "Cameroon",
  "CN": "China",
  "CO": "Colombia",
  "CR": "Costa Rica",
  "CZ": "Czech Republic",
  "DE": "Germany",
  "DK": "Denmark",
  "DO": "Dominican Republic",
  "DZ": "Algeria",
  "EC": "Ecuador",
  "EE": "Estonia",
  "EG": "Egypt",
  "ES": "Spain",
  "FI": "Finland",
  "FR": "France",
  "GB": "United Kingdom",
  "GH": "Ghana",
  "GR": "Greece",
  "GT": "Guatemala",
  "HK": "Hong Kong",
  "HN": "Honduras",
  "HU": "Hungary",
  "ID": "Indonesia",
  "IE": "Ireland",
  "IL": "Israel",
  "IN": "India",
  "IQ": "Iraq",
  "IS": "Iceland",
  "IT": "Italy",
  "JM": "Jamaica",
  "JP": "Japan",
  "KG": "Kyrgyzstan",
  "KM": "Comoros",
  "KR": "South Korea",
  "KZ": "Kazakhstan",
  "LB": "Lebanon",
  "LK": "Sri Lanka",
  "LT": "Lithuania",
  "LU": "Luxembourg",
  "LV": "Latvia",
  "LY": "Libya",
  "MA": "Morocco",
  "MD": "Moldova",
  "MX": "Mexico",
  "MY": "Malaysia",
  "NG": "Nigeria",
  "NI": "Nicaragua",
  "NL": "Netherlands",
  "NO": "Norway",
  "NZ": "New Zealand",
  "PA": "Panama",
  "PE": "Peru",
  "PH": "Philippines",
  "PK": "Pakistan",
  "PL": "Poland",
  "PR": "Puerto Rico",
  "PT": "Portugal",
  "PY": "Paraguay",
  "RO": "Romania",
  "RU": "Russia",
  "SA": "Saudi Arabia",
  "SE": "Sweden",
  "SG": "Singapore",
  "SK": "Slovakia",
  "ST": "Sao Tome and Principe",
  "SV": "El Salvador",
  "SY": "Syria",
  "TH": "Thailand",
  "TR": "Turkey",
  "TW": "Taiwan",
  "UA": "Ukraine",
  "US": "United States",
  "UY": "Uruguay",
  "VE": "Venezuela",
  "VN": "Vietnam",
  "ZA": "South Africa",
};

type Props = {
  date: string;
  country: string;
  impex: string;
  onFiltered: (songs: SpotifyData[]) => void;
};

type SpotifyData = {
  country: string;
  country_coords: { long: number; lat: number };
  month: string;
  name: string;
  artists: string;
  borda_score: number;
  origin_country: string;
  origin_coords: { long: number; lat: number };
  destinations?: string[];
};

export function MyGlobe(props: Props) {
  const [countryPolygons, setCountryPolygons] = useState({ features: [] });
  const [countryLatLong, setCountryLatLong] = useState({ features: [] });
  const [coordinates, setCoordinates] = useState();
  const [data, setData] = useState<SpotifyData[]>([]);
  const globeRef = useRef(null);

  useEffect(() => {
    if (!globeRef.current) return;

    const bloomPass = new UnrealBloomPass();
    bloomPass.threshold = 0;
    bloomPass.strength = 0.5;
    bloomPass.radius = 0.15;

    globeRef.current.postProcessingComposer().addPass(bloomPass);
  }, []);

  useEffect(() => {
    Promise.all([
      fetch("/ne_110m.geojson").then(res => res.json()),
      fetch("/country_centroid.geojson").then(res => res.json()),
      fetch("/country_coordinates.json").then(res => res.json()),
      fetch("/final_cleaned_data.csv").then(res => res.text()),
    ])
      .then(([poly, ll, cds, data]) => {
        setCountryPolygons(poly);
        setCountryLatLong(ll);
        setCoordinates(cds);
        // loads in cleaned ranked dataset as string and slice into arr of json
        const parsedData = Papa.parse(data);
        const formattedData = parsedData.data.slice(1).map(songObj => {
          // destructure into vars and load as json objects
          const [u1, u2, u3, index, country, month, name, artists, borda_score, origin_country] = songObj;
          const country_coords = cds[country];
          const origin_coords = cds[origin_country];
          return { country, country_coords, month, name, artists, borda_score, origin_country, origin_coords };
        });
        setData(formattedData);
      });
  }, []);

  useEffect(() => {
    if (!globeRef.current || !coordinates) return;
    const coords = coordinates[props.country];
    globeRef.current.pointOfView({ lat: coords[1], lng: coords[0], altitude: 1.25 }, 1500);
  }, [props.country]);

  const filteredImport = useMemo(() => data.filter(a => a.country === props.country && a.month === props.date), [
    data,
    props.country,
    props.date,
  ]);
  const filteredExport = useMemo(() => {
    const arr = data.filter(a =>
      a.origin_country === props.country && a.month === props.date && a.country !== a.origin_country
    );
    const grouped = new Map<string, SpotifyData & { destinations: string[] }>();
    arr.forEach(a => {
      if (grouped.has(a.name)) {
        const newSong = grouped.get(a.name)!;
        newSong.destinations.push(a.country);
      } else {
        grouped.set(a.name, { ...a, destinations: [a.country] });
      }
    });
    return Array.from(grouped.values());
  }, [data, props.country, props.date]);
  const filtered = useMemo(() => {
    return (props.impex === "import") ? filteredImport : filteredExport;
  }, [filteredImport, filteredExport, props.impex]);

  useEffect(() => {
    props.onFiltered(filtered);
  }, [filtered]);

  return (
    <Box>
      <Globe
        ref={globeRef}
        showAtmosphere={true}
        atmosphereAltitude={0.1}
        backgroundColor="rgba(0,0,0,0)"
        polygonsData={countryPolygons.features}
        polygonCapColor={d => {
          const countryCode = d.properties.ISO_A2;
          if (countryCode === props.country) return "rgba(63, 159, 198, 0.06)";

          const relevantCodes = props.impex === "import"
            ? filtered.map(d => d.origin_country)
            : filtered.map(d => d.country);

          if (relevantCodes.includes(countryCode)) return "rgba(71, 108, 122, 0.06)";
          return "rgba(0, 0, 0, 0)";
        }}
        polygonStrokeColor={d => {
          const countryCode = d.properties.ISO_A2;
          if (countryCode === props.country) return "rgba(63, 159, 198, 0.06)";
          return "white";
        }}
        polygonSideColor={d => {
          return d.properties.ISO_A2 === props.country ? "rgba(63, 159, 198, 0.06)" : "rgba(0, 0, 0, 0)";
        }}
        polygonAltitude={d => {
          const countryCode = d.properties.ISO_A2;
          if (countryCode === props.country) return 0.03;
          return 0.01;
        }}
        rendererConfig={{
          logarithmicDepthBuffer: true,
          precision: "highp",
        }}
        labelsData={countryLatLong.features.filter(d => Object.keys(includedCountries).includes(d.properties.ISO))}
        labelLat={d => d.geometry.coordinates[1]}
        labelLng={d => d.geometry.coordinates[0]}
        labelText={d => d.properties.COUNTRY}
        labelSize={d => props.country === d.properties.ISO ? 1.25 : 0.8}
        labelAltitude={d => {
          const countryCode = d.properties.ISO;
          if (countryCode === props.country) return 0.05;
          return 0.01;
        }}
        labelIncludeDot={true}
        arcsData={props.country === "Global" ? data : filtered}
        arcEndLat={a => a.country_coords[1]}
        arcEndLng={a => a.country_coords[0]}
        arcStartLat={a => a.origin_coords[1]}
        arcStartLng={a => a.origin_coords[0]}
        arcLabel={a =>
          `<b>${a.origin_country} \u2192 ${a.country}<b><br/><b>SONG:</b> ${a.name}<br/><b>ARTIST:</b> ${a.artists}`}
        arcColor={() => ["rgba(0, 255, 0, 0.5)", "rgba(255, 0, 0, 0.5)"]}
        arcAltitude={props.country === "Global" ? 0.5 : a => 0.1 + Math.random() * 0.7}
        arcStroke={0.5}
        arcDashAnimateTime={() => Math.random() * 4000 + 500}
        arcDashLength={0.05}
        arcDashGap={0.1}
      />
    </Box>
  );
}

// References:
// 1. Most of the code based off examples from official globe-gl examples found here: https://github.com/vasturiano/globe.gl/tree/master
//     !! Specific examples used: hollow-globe, choropleth-countries, world-cities, airline-routes
// 2. Country centroids: https://raw.githubusercontent.com/gavinr/world-countries-centroids/master/dist/countries.geojson
// 3. Add singapore, comoros, saotome and principles, hongkong, taiwan polygons: https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/50m/cultural/ne_50m_admin_0_countries.json
//
