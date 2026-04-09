import { CountryFilter } from "#/components/CountryFilter";
import { MyGlobe } from "#/components/Globe";
import { ImportExportRadioButton } from "#/components/RadioButtons";
import { TimelineSlider } from "#/components/TimelineSlider";
import { Box, Typography } from "@mui/material";
import { Proportions } from "lucide-react";
import { useState } from "react";

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

export function DestinationList({ destinations = [] }: { destinations: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const MAX = 3;
  const remaining = destinations.length - MAX;
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
      <Typography
        sx={{
          color: "white",
          fontFamily: "Nueue",
          fontSize: "13px",
          fontweight: "medium",
          textAlign: "center",
        }}
      >
        {expanded ? destinations.join(", ") : destinations.slice(0, MAX).join(", ")}
        {!expanded && remaining > 0 && (
          <Typography
            onClick={() => setExpanded(true)}
            sx={{ color: "grey", fontSize: "9px", fontFamily: "Nueue", cursor: "pointer" }}
          >
            +{remaining} more
          </Typography>
        )}
        {expanded && (
          <Typography
            onClick={() => setExpanded(false)}
            sx={{ color: "grey", fontSize: "9px", fontFamily: "Nueue", cursor: "pointer" }}
          >
            show less
          </Typography>
        )}
      </Typography>
    </Box>
  );
}

export function HomePage() {
  const [date, setDate] = useState("2023-10");
  const [country, setCountry] = useState("");
  const [impex, setImpex] = useState("import");
  const [topSongs, setTopSongs] = useState([]);
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "90%",
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            flexDirection: "column",
            background: "linear-gradient(to right, #000000, #00000000)",
            p: 4,
            width: "350px",
            minWidth: "350px",
            flexShrink: 0,
            zIndex: 99,
            height: "85%",
          }}
        >
          <Typography
            sx={{
              fontFamily: "NueueBold",
              color: "white",
              fontWeight: "bold",
              fontSize: "40px",
              lineHeight: 1.2,
              pb: 2,
            }}
          >
            GLOBAL MUSIC CONSUMPTION
          </Typography>

          <CountryFilter country={country} setCountry={setCountry} impex={impex} />
          <Box sx={{ pt: 1, pb: 1 }}>
            <ImportExportRadioButton impex={impex} setImpex={setImpex} country={country} />
          </Box>
          <Box sx={{ display: "flex", pb: 0.5 }}>
            {impex === "import"
              ? (
                <Typography sx={{ color: country ? "white" : "grey" }}>
                  Top Songs Imported to {includedCountries[country]}:
                </Typography>
              )
              : <Typography sx={{ color: "white" }}>Top Songs Exported from {includedCountries[country]}:</Typography>}
          </Box>

          <Box
            key={date}
            sx={{
              scrollbargutter: "stable",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              animation: "fadeIn 1.5s ease-out",
              "@keyframes fadeIn": {
                "0%": { opacity: 0, transform: "translateY(0px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
              maxHeight: "400px",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: "10px",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.63)",
                },
              },
            }}
          >
            {topSongs.length === 0
              ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                  <Typography sx={{ fontFamily: "Nueue", color: "grey" }}>No songs at this time</Typography>
                </Box>
              )
              : topSongs.map((song) => (
                <Box
                  sx={{
                    p: 0.5,
                    borderTop: "0.5px solid rgba(255, 255, 255, 0.74)",
                    borderBottom: "0.5px solid rgba(255,255,255,0.74)",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "70%",
                        justifyContent: "center",
                      }}
                    >
                      <Typography sx={{ color: "white", fontFamily: "Nueue", fontSize: "13px", fontweight: "medium" }}>
                        {song.name}
                      </Typography>
                      <Typography sx={{ color: "grey", fontFamily: "Nueue", fontSize: "10px" }}>
                        {song.artists}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: impex === "export" ? "25%" : "10%",
                      }}
                    >
                      {impex === "import"
                        ? (
                          <Box>
                            <Typography
                              sx={{ color: "grey", fontFamily: "Nueue", fontSize: "8px", fontweight: "medium" }}
                            >
                              ORIGIN
                            </Typography>
                            <Typography
                              sx={{
                                color: "white",
                                fontFamily: "Nueue",
                                fontSize: "13px",
                                fontweight: "medium",
                                textAlign: "center",
                              }}
                            >
                              {song.origin_country}
                            </Typography>
                          </Box>
                        )
                        : (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "grey",
                                fontFamily: "Nueue",
                                fontSize: "8px",
                                fontweight: "medium",
                                textAlign: "center",
                              }}
                            >
                              DESTINATION
                            </Typography>
                            <Typography
                              sx={{
                                color: "white",
                                fontFamily: "Nueue",
                                fontSize: "13px",
                                fontweight: "medium",
                                textAlign: "center",
                              }}
                            >
                              <DestinationList destinations={song.destinations} />
                            </Typography>
                          </Box>
                        )}
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            width: "100%",
            height: "100%",
          }}
        >
          <MyGlobe
            date={date}
            country={country}
            impex={impex}
            onFiltered={setTopSongs}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          p: 1,
          pl: 2,
          pr: 2,
          height: "15%",
          position: "absolute",
          bottom: 0,
          background: "linear-gradient(to top, #000000, #00000000)",
        }}
      >
        <TimelineSlider date={date} setDate={setDate} country={country} />
      </Box>
    </Box>
  );
}
