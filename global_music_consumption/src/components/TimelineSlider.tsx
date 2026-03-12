import { Slider } from "@mui/material";
import { useEffect, useState } from "react";

export function TimelineSlider() {
  const [timeline, setTimeline] = useState([]);
  useEffect(() => {
    fetch("/timeline.json").then(res => res.json())
      .then(data => {
        setTimeline(data);
      });
  });
  return (
    <Slider
      size="small"
      aria-label="Always visible"
      defaultValue={0}
      marks={timeline}
      step={1}
      min={0}
      max={20}
    />
  );
}
