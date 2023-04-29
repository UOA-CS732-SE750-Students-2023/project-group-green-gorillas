import React from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Box, Container } from "@mui/material";
import stageStyles from "../styles/stage.module.css";

export const ThinkNote = ({
  note,
  i,
  updateNote,
  deleteNote,
  newestNote,
}: any) => {
  return (
    <Container className={stageStyles.note__wrapper} disableGutters>
      <Box
        className={
          [
            stageStyles.note__container,
            stageStyles[`note__container__${note.color}`],
          ] as any
        }
      >
        <TextareaAutosize
          placeholder="Type your note here..."
          className={stageStyles.note__textarea}
          value={note.value}
          onChange={(e) => updateNote(i, e)}
          autoFocus={i === newestNote}
        />
      </Box>
      <Box className={stageStyles.delete__note} onClick={() => deleteNote(i)}>
        Delete
      </Box>
    </Container>
  );
};
