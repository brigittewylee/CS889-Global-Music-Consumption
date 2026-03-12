import { Box, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  date: string;
  setDate: (val: string) => void;
};

export function TimelineSlider(props: Props) {
  const monthMap = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sept",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  };
  const [timeline, setTimeline] = useState([]);
  useEffect(() => {
    fetch("/timeline.json").then(res => res.json())
      .then(data => {
        setTimeline(data);
      });
  }, []);
  const yearMarkers = timeline
    .filter(t => t.label.endsWith("-01"))
    .map(t => ({
      year: t.label.split("-")[0],
      spacing: (t.value / (timeline.length - 1)) * 100,
    }));
  const Months = timeline
    .map(t => ({
      value: t.value,
      month: monthMap[t.label.split("-")[1]],
    }));
  return (
    <Box sx={{ position: "relative", px: 2 }}>
      <Box sx={{ position: "relative", height: "20px" }}>
        {yearMarkers.map(y => (
          <Box>
            <Typography
              key={y.year}
              sx={{
                position: "absolute",
                left: `${y.spacing}%`,
                transform: "translateX(-50%)",
              }}
            >
              {y.year}
            </Typography>
            <Box
              sx={{
                position: "absolute",
                left: `${y.spacing}%`,
                transform: "translateX(-50%)",
                border: "1px solid white",
                height: "50px",
              }}
            />
          </Box>
        ))}
      </Box>

      <Slider
        marks={Months.map(t => ({ value: t.value, label: t.month }))}
        min={0}
        max={timeline.length - 1}
        onChange={(e, value) => props.setDate(timeline[Number(value)].label)}
      />
    </Box>
  );
}
