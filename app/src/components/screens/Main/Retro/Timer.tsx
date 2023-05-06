import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import stageStyles from "./styles/stage.module.css";

export const Timer = ({ time }: any) => {
  const [color, setColor] = useState("green");

  function formatTime(toFormat: any) {
    let seconds: any = toFormat % 60;
    let minutes: any = Math.floor(toFormat / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  }

  useEffect(() => {
    setColor(() => {
      if (time <= 45 && time >= 15) return "yellow";
      if (time <= 45) return "red";
      return "green";
    });
  }, [time]);

  if (time <= 0) {
    return null;
  }

  return (
    <Box className={[stageStyles.timer, stageStyles[`timer--${color}`]] as any}>
      {formatTime(time)}
    </Box>
  );
};
