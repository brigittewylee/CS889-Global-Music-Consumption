import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import type { StringMappingType } from "typescript";

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
};

type SpotifyData = {
  country: string;
  country_coords: { long: number; lat: number };
  month: string;
  name: String;
  artists: string;
  borda_score: number;
  origin_country: string;
  origin_coords: { long: number; lat: number };
};

export function MyGlobe(props: Props) {
  const [countryPolygons, setCountryPolygons] = useState({ features: [] });
  const [countryLatLong, setCountryLatLong] = useState({ features: [] });
  const [hover, setHover] = useState([]);
  const [coordinates, setCoordinates] = useState();
  const [data, setData] = useState<SpotifyData[]>([]);

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
        const arrOfData = data.split("\n").slice(1);
        const parsedData = arrOfData.map(songObj => {
          // destructure into vars and load as json objects
          const [u1, u2, u3, index, country, month, name, artists, borda_score, origin_country] = songObj.split(",");
          const country_coords = cds[country];
          const origin_coords = cds[origin_country];
          return { country, country_coords, month, name, artists, borda_score, origin_country, origin_coords };
        });
        setData(parsedData);
      });
  }, []);

  const filtered = data.filter(a => includedCountries[a.country] === props.country && a.month === props.date);
  console.log(filtered);

  return (
    <Box>
      <Globe
        backgroundColor="rgba(0,0,0,0)"
        polygonsData={countryPolygons.features}
        polygonCapColor={() => "rgba(0, 0, 0, 0.5)"}
        polygonStrokeColor={() => "#ffffff"}
        polygonSideColor={() => "rgba(0, 0, 0, 0)"}
        polygonAltitude={0.01}
        rendererConfig={{
          logarithmicDepthBuffer: true,
          precision: "highp",
        }}
        labelsData={countryLatLong.features.filter(d => Object.keys(includedCountries).includes(d.properties.ISO))}
        labelLat={d => d.geometry.coordinates[1]}
        labelLng={d => d.geometry.coordinates[0]}
        labelText={d => d.properties.COUNTRY}
        labelAltitude={0.012}
        labelIncludeDot={true}
        arcsData={filtered}
        arcEndLat={a => a.country_coords[1]}
        arcEndLng={a => a.country_coords[0]}
        arcStartLat={a => a.origin_coords[1]}
        arcStartLng={a => a.origin_coords[0]}
        arcLabel={a => `${a.name} by ${a.artists}`}
        arcColor={() => ["rgba(0, 255, 0, 0.5)", "rgba(255, 0, 0, 0.5)"]}
        arcAltitude={0.2}
        arcStroke={0.5}
      />
    </Box>
  );
}

// References:
// 1. Most of the code based off examples from official globe-gl examples found here: https://github.com/vasturiano/globe.gl/tree/master
//     !! Specific examples used: hollow-globe, choropleth-countries, world-cities, airline-routes
// 2. Country centroids: https://raw.githubusercontent.com/gavinr/world-countries-centroids/master/dist/countries.geojson
// 3. Add singapore, comoros, saotome and principles, hongkong polygons: https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/50m/cultural/ne_50m_admin_0_countries.json
//
