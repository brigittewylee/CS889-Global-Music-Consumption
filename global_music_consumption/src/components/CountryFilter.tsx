import { Box, FormControl, keyframes, MenuItem, Select, Typography } from "@mui/material";

type Props = {
  country: string;
  setCountry: (val: string) => void;
  impex: string;
};

export function CountryFilter(props: Props) {
  const countryMap = {
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
  const importCountries = [
    "AE",
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
    "CO",
    "CR",
    "CZ",
    "DE",
    "DK",
    "DO",
    "EC",
    "EE",
    "EG",
    "ES",
    "FI",
    "FR",
    "GB",
    "GR",
    "GT",
    "HK",
    "HN",
    "HU",
    "ID",
    "IE",
    "IL",
    "IN",
    "IS",
    "IT",
    "JP",
    "KR",
    "KZ",
    "LT",
    "LU",
    "LV",
    "MA",
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
    "PT",
    "PY",
    "RO",
    "SA",
    "SE",
    "SG",
    "SK",
    "SV",
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
  const exportCountries = [
    "AE",
    "AO",
    "AR",
    "AT",
    "AU",
    "BE",
    "BG",
    "BR",
    "BY",
    "CA",
    "CL",
    "CM",
    "CN",
    "CO",
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
    "HK",
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
    "LV",
    "LY",
    "MA",
    "MD",
    "MX",
    "MY",
    "NG",
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
    "RO",
    "RU",
    "SA",
    "SE",
    "SK",
    "ST",
    "SY",
    "TR",
    "TW",
    "UA",
    "US",
    "UY",
    "VE",
    "VN",
    "ZA",
  ];

  const importFull = importCountries.map(country => ({ iso: country, full: countryMap[country] }));
  const sortedImport = importFull.sort((a, b) => a.full.localeCompare(b.full));
  const exportFull = exportCountries.map(country => ({ iso: country, full: countryMap[country] }));
  const sortedExport = exportFull.sort((a, b) => a.full.localeCompare(b.full));

  const flashAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.1; }
  100% { opacity: 1; }`;

  return (
    <Box sx={{ width: "100%" }}>
      {props.country
        ? (
          <Typography sx={{ color: "white", pb: 0.5 }}>
            Filter by Country:
          </Typography>
        )
        : (
          <Typography sx={{ animation: `${flashAnimation} 3s ease-in-out`, color: "#ff9d9d" }}>
            Select a Country to begin:
          </Typography>
        )}

      <FormControl sx={{ width: "100%" }}>
        <Select
          value={props.country ?? ""}
          displayEmpty
          labelId="country-filter-label"
          id="country-filter"
          onChange={(e) => props.setCountry(e.target.value)}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            PaperProps: {
              sx: {
                bgcolor: "#1a1a1a",
                maxHeight: 350,
                "&::-webkit-scrollbar": { width: "6px" },
                "&::-webkit-scrollbar-track": { background: "transparent" },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "10px",
                },
              },
            },
          }}
          sx={{
            color: "white",
            fontFamily: "Nueue",
            "& .MuiSelect-select": {
              pt: "5px",
              pb: "5px",
            },
          }}
        >
          <MenuItem disabled value="">
            <Typography sx={{ fontFamily: "Nueue", color: "grey" }}>Select a country</Typography>
          </MenuItem>
          {props.impex === "import"
            ? sortedImport.map((country) => (
              <MenuItem sx={{ fontFamily: "Nueue" }} key={country.iso} value={country.iso}>{country.full}</MenuItem>
            ))
            : sortedExport.map((country) => (
              <MenuItem sx={{ fontFamily: "Nueue" }} key={country.iso} value={country.iso}>{country.full}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}

// References:
// 1. Adjustments to scrollbar: https://stackoverflow.com/questions/53772429/material-ui-how-can-i-style-the-scrollbar-with-css-in-js
