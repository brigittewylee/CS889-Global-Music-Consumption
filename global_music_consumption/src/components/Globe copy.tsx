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

export function MyGlobe() {
  const [countryPolygons, setCountryPolygons] = useState({ features: [] });
  const [hover, setHover] = useState([]);
  const [countryLatLong, setCountryLatLong] = useState({ features: [] });

  useEffect(() => {
    fetch("/ne_110m.geojson").then(res => res.json())
      .then(setCountryPolygons);
  }, []);

  useEffect(() => {
    fetch("/country_centroid.geojson").then(res => res.json())
      .then(data => {
        setCountryLatLong(data);
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
          antialias: true,
          precision: "highp", 
        }}
        labelsData={countryLatLong.features.filter(d => includedCountries.includes(d.properties.ISO))}
        labelLat={d => d.geometry.coordinates[1]}
        labelLng={d => d.geometry.coordinates[0]}
        labelText={d => d.properties.COUNTRY}
        labelAltitude={0.012}
        labelIncludeDot={true}
        // labelColor={() => "#ffffff"}
      />
    </Box>
  );
}

// References:
// 1. React-globe.gl : https://github.com/vasturiano/react-globe.gl/blob/master/example/hollow-globe/index.html
// 2. choropleth globe: https://github.com/vasturiano/react-globe.gl/blob/master/example/choropleth-countries/index.html
// 3. add singapore, comoros, saotome and principles, hongkong: https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/50m/cultural/ne_50m_admin_0_countries.json
