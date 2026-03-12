import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Globe from "react-globe.gl";

const includedCountries = [
  "AE",
  "AO",
  "AR",
  "AT",
  "AU",
  "BE",
  "BG",
  "BO",
  "BR",
  "BY",
  "CA",
  "CH",
  "CL",
  "CM",
  "CN",
  "CO",
  "CR",
  "CZ",
  "DE",
  "DK",
  "DO",
  "DZ",
  "EC",
  "EE",
  "EG",
  "ES",
  "FI",
  "FR",
  "GB",
  "GH",
  "GR",
  "GT",
  "HK",
  "HN",
  "HU",
  "ID",
  "IE",
  "IL",
  "IN",
  "IQ",
  "IS",
  "IT",
  "JM",
  "JP",
  "KG",
  "KM",
  "KR",
  "KZ",
  "LB",
  "LK",
  "LT",
  "LU",
  "LV",
  "LY",
  "MA",
  "MD",
  "MX",
  "MY",
  "NG",
  "NI",
  "NL",
  "NO",
  "NZ",
  "PA",
  "PE",
  "PH",
  "PK",
  "PL",
  "PR",
  "PT",
  "PY",
  "RO",
  "RU",
  "SA",
  "SE",
  "SG",
  "SK",
  "ST",
  "SV",
  "SY",
  "TH",
  "TR",
  "TW",
  "UA",
  "US",
  "UY",
  "VE",
  "VN",
  "ZA",
];

type Props = {
  date: string;
  country: string;
};
export function MyGlobe(props: Props) {
  const [countryPolygons, setCountryPolygons] = useState({ features: [] });
  const [countryLatLong, setCountryLatLong] = useState({ features: [] });
  const [hover, setHover] = useState([]);
  const [coordinates, setCoordinates] = useState();
  const [data, setData] = useState();

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
        labelsData={countryLatLong.features.filter(d => includedCountries.includes(d.properties.ISO))}
        labelLat={d => d.geometry.coordinates[1]}
        labelLng={d => d.geometry.coordinates[0]}
        labelText={d => d.properties.COUNTRY}
        labelAltitude={0.012}
        labelIncludeDot={true}

        arcsData={data.filter(a => a.country_)}
        // arcEndLat={d => d.country_coords[1]}
        // arcEndLng={d => d.country_coords[0]}
        // arcStartLat={d => d.origin_country[1]}
        // arcStartLng={d => d.origin_country[0]}
        // arcLabel={d => `${d.name} by ${d.artists}`}
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
