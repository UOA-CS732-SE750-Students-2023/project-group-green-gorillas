import { Box } from "@mui/material";
import React from "react";
import stageStyles from "../styles/stage.module.css";

function DiscussNote({ note }: any) {
  return (
    <Box className={stageStyles.note__wrapper}>
      <Box
        className={
          [
            stageStyles.note__container,
            stageStyles[`note__container__${note.color}`],
          ] as any
        }
      >
        {note.value}
      </Box>
    </Box>
  );
}

export default DiscussNote;
