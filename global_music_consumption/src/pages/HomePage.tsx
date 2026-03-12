import { CountryFilter } from "#/components/CountryFilter";
import { MyGlobe } from "#/components/Globe";
import { TimelineSlider } from "#/components/TimelineSlider";
import { Box, Typography } from "@mui/material";

export function HomePage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", overflow: "hidden", height: "100vh", width: "100vw", border: '1px solid green' }}>
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
        <Box sx={{ display: "flex", flexDirection: "column", p: 2, width: "35%" }}>
          <Typography>
            GLOBAL MUSIC CONSUMPTION
          </Typography>
          <CountryFilter />
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "65%",
            border: "1px solid green",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MyGlobe />
        </Box>
      </Box>

      <Box sx={{ width: "100%", p: 3, pl: 5, pr: 5, height: "15%" }}>
        <TimelineSlider />
      </Box>
    </Box>
  );
}
