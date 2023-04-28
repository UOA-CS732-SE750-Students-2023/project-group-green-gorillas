import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import stageStyles from "../Retro/styles/stage.module.css";

export const Timer = ({ startTime }: any) => {
  const [time, setTime] = useState(startTime);
  const [color, setColor] = useState("green");

  function formatTime(toFormat: any) {
    let seconds: any = toFormat % 60;
    let minutes: any = Math.floor(toFormat / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (time >= 1) {
        setTime(time - 1);
        formatTime(time);
        if (time <= 45 && color === "green") setColor("yellow");
        if (time <= 15 && color === "yellow") setColor("red");
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <Box className={[stageStyles.timer, stageStyles[`timer--${color}`]] as any}>
      {formatTime(time)}
    </Box>
  );
};
