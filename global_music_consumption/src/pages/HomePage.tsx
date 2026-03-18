import { CountryFilter } from "#/components/CountryFilter";
import { MyGlobe } from "#/components/Globe";
import { TimelineSlider } from "#/components/TimelineSlider";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

export function HomePage() {
  const [date, setDate] = useState("2023-10");
  const [country, setCountry] = useState("Canada");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
        border: "1px solid green",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "90%",
          border: "1px solid red",
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            width: "30%",
            color: "black",
            border: "1px solid cyan",
          }}
        >
          <Typography sx={{ color: "white" }}>
            GLOBAL MUSIC CONSUMPTION
          </Typography>

          <CountryFilter country={country} setCountry={setCountry} />
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "70%",
            border: "1px solid green",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            m: 2,
          }}
        >
          <MyGlobe date={date} country={country} />
        </Box>
      </Box>

      <Box sx={{ width: "100%", p: 3, pl: 5, pr: 5, height: "15%" }}>
        <TimelineSlider date={date} setDate={setDate} />
      </Box>
    </Box>
  );
}
