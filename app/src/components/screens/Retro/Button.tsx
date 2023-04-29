import { Box } from "@mui/material";
import React from "react";
import styles from "./styles/styles.module.css";

function Button({ text, color, clickFn }: any) {
  return (
    <Box
      className={[styles.button, styles[`button__${color}`]] as any}
      onClick={clickFn}
    >
      {text}
    </Box>
  );
}

export default Button;
