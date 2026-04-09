import { Box, Button, Slider, Typography } from "@mui/material";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  date: string;
  setDate: (val: string) => void;
  country: string;
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
  const [sliderValue, setSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/timeline.json")
      .then(res => res.json())
      .then(data => setTimeline(data));
  }, []);

  useEffect(() => {
    if (!isPlaying || !timeline.length) return;

    intervalRef.current = setInterval(() => {
      setSliderValue(prev => {
        const next = prev + 1;
        if (next >= timeline.length) {
          setIsPlaying(false);
          return prev;
        }
        props.setDate(timeline[next].label);
        return next;
      });
    }, 600);

    return () => clearInterval(intervalRef.current!);
  }, [isPlaying, timeline]);

  const handlePlayPause = () => {
    if (!isPlaying && sliderValue >= timeline.length - 1) {
      setSliderValue(0);
      props.setDate(timeline[0].label);
    }
    setIsPlaying(prev => !prev);
  };

  const handleSliderChange = (_: Event, value: number | number[]) => {
    const val = Number(value);
    setSliderValue(val);
    props.setDate(timeline[val].label);
  };

  const yearMarkers = timeline
    .filter(t => t.label.endsWith("-01"))
    .map(t => ({
      year: t.label.split("-")[0],
      spacing: (t.value / (timeline.length - 1)) * 100,
    }));

  const Months = timeline.map(t => ({
    value: t.value,
    month: monthMap[t.label.split("-")[1]],
  }));

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "98%",
          height: "80%",
          alignItems: "center",
          justifyContent: "center",
          background: props.country === "" ? "#0000007a" : "transparent",
          position: "absolute",
          zIndex: props.country === "" ? 10 : 0,
        }}
      >
        {props.country
          ? <Box />
          : (
            <Box
              sx={{
                p: 1,
                pl: 1,
                pr: 1,
                borderRadius: 3,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            />
          )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", pr: 1, pb: 1 }}>
          {props.country
            ? (
              <Button
                onClick={handlePlayPause}
                sx={{
                  transition: "all 0.4s ease-in",
                  ":hover": { transform: "scale(1.1)" },
                  color: "white",
                  minWidth: "50px",
                  width: "20px",
                  borderRadius: "50%",
                  p: 1.5,
                }}
              >
                {isPlaying ? <Pause /> : <Play />}
              </Button>
            )
            : (
              <Button
                disabled
                onClick={handlePlayPause}
                sx={{
                  transition: "all 0.4s ease-in",
                  ":hover": { transform: "scale(1.1)" },
                  color: "white",
                  minWidth: "50px",
                  width: "20px",
                  borderRadius: "50%",
                  p: 1.5,
                }}
              >
                {isPlaying ? <Pause /> : <Play />}
              </Button>
            )}
        </Box>

        <Box sx={{ position: "relative", px: 2, width: "100%" }}>
          <Box sx={{ position: "relative", height: "20px" }}>
            {yearMarkers.map(y => (
              <Box key={y.year}>
                <Typography
                  sx={{
                    fontFamily: "NueueBold",
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
                    margin: "0 auto",
                    transform: "translateX(-50%)",
                    border: "1px solid white",
                    height: "12px",
                    top: "23px",
                  }}
                />
              </Box>
            ))}
          </Box>

          {props.country
            ? (
              <Box>
                <Slider
                  value={sliderValue}
                  marks={Months.map(t => ({ value: t.value, label: t.month }))}
                  min={0}
                  max={timeline.length - 1}
                  onChange={handleSliderChange}
                  sx={{
                    "& .MuiSlider-markLabel": {
                      fontFamily: "Nueue",
                    },
                    "& .MuiSlider-thumb, & .MuiSlider-track": {
                      transition: isPlaying ? "all 650ms linear" : "none",
                      backgroundColor: "white",
                    },
                    "& .MuiSlider-thumb.Mui-active": {
                      boxShadow: "none",
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                    },
                  }}
                />
              </Box>
            )
            : (
              <Slider
                disabled
                value={sliderValue}
                marks={Months.map(t => ({ value: t.value, label: t.month }))}
                min={0}
                max={timeline.length - 1}
                onChange={handleSliderChange}
                sx={{
                  "& .MuiSlider-markLabel": {
                    fontFamily: "Nueue",
                    color: "grey",
                  },
                  "& .MuiSlider-thumb, & .MuiSlider-track": {
                    transition: isPlaying ? "all 650ms linear" : "none",
                    backgroundColor: "grey",
                  },
                  "& .MuiSlider-thumb.Mui-active": {
                    boxShadow: "none",
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              />
            )}
        </Box>
      </Box>
    </Box>
  );
}
