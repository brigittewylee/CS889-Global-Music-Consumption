import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";

type Props = {
  country: string;
  setCountry: (val: string) => void;
};

export function CountryFilter(props: Props) {
  const countries = [
    "Global",
    "United Arab Emirates",
    "Angola",
    "Argentina",
    "Austria",
    "Australia",
    "Belgium",
    "Bulgaria",
    "Bolivia",
    "Brazil",
    "Belarus",
    "Canada",
    "Switzerland",
    "Chile",
    "Cameroon",
    "China",
    "Colombia",
    "Costa Rica",
    "Czech Republic",
    "Germany",
    "Denmark",
    "Dominican Republic",
    "Algeria",
    "Ecuador",
    "Estonia",
    "Egypt",
    "Spain",
    "Finland",
    "France",
    "United Kingdom",
    "Ghana",
    "Greece",
    "Guatemala",
    "Hong Kong",
    "Honduras",
    "Hungary",
    "Indonesia",
    "Ireland",
    "Israel",
    "India",
    "Iraq",
    "Iceland",
    "Italy",
    "Jamaica",
    "Japan",
    "Kyrgyzstan",
    "Comoros",
    "South Korea",
    "Kazakhstan",
    "Lebanon",
    "Sri Lanka",
    "Lithuania",
    "Luxembourg",
    "Latvia",
    "Libya",
    "Morocco",
    "Moldova",
    "Mexico",
    "Malaysia",
    "Nigeria",
    "Nicaragua",
    "Netherlands",
    "Norway",
    "New Zealand",
    "Panama",
    "Peru",
    "Philippines",
    "Pakistan",
    "Poland",
    "Puerto Rico",
    "Portugal",
    "Paraguay",
    "Romania",
    "Russia",
    "Saudi Arabia",
    "Sweden",
    "Singapore",
    "Slovakia",
    "Sao Tome and Principe",
    "El Salvador",
    "Syria",
    "Thailand",
    "Turkey",
    "Taiwan",
    "Ukraine",
    "United States",
    "Uruguay",
    "Venezuela",
    "Vietnam",
    "South Africa",
  ];

  return (
    <Box sx={{ width: "100%", border: "1px solid orange" }}>
      <Typography>
        Filter by Country:
      </Typography>
      <FormControl sx={{ width: "100%" }}>
        <Select
          value={props.country ?? "Global"}
          labelId="country-filter-label"
          id="country-filter"
          onChange={(e) => props.setCountry(e.target.value)}
        >
          {countries.map((country) => <MenuItem key={country} value={country}>{country}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}
