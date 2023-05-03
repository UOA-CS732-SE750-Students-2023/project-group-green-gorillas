import { Box, Container, Input } from "@mui/material";
import React, { useState } from "react";
import stageStyles from "../styles/stage.module.css";
import styles from "../styles/styles.module.css";
import addIcon from "../../../../../assets/add.svg";
import { ThinkNote } from "./ThinkNote";
import { request } from "../../../../../api/request";
import { ADD_RETRO_NOTE } from "../../../../../api/api";

enum BoardNoteType {
  NORMAL = "NORMAL",
  GROUP = "GROUP",
}

// don't change it
const colors = ["pink", "blue", "yellow"];

const ThinkColumn = ({
  boardSection,
  setFocusedNoteRef,
  focusedNoteRef,
}: any) => {
  console.log("🚀 ~ file: ThinkColumn.tsx:23 ~ boardSection:", boardSection);
  const createNote = async () => {
    await request.post(ADD_RETRO_NOTE, {
      boardId: boardSection.boardId,
      boardSectionId: boardSection.id,
      teamId: boardSection.teamId,
      boardNoteType: BoardNoteType.NORMAL,
      boardNoteColor: colors[Math.floor(colors.length * Math.random())],
    });
  };

  return (
    <Container
      className={stageStyles.column}
      disableGutters
      // @ts-ignore
      maxWidth="false"
    >
      <Box className={stageStyles.column__header}>
        <Box>
          <Box className={styles.select__heading}>
            {boardSection.description}
          </Box>
          <Input
            className={styles.heading}
            defaultValue={boardSection.name}
            sx={{
              "& .MuiInput-underline": {
                "&::before": {
                  borderBottom: "none",
                },
              },
            }}
            value={boardSection.name}
          />
        </Box>
        <Box
          className={stageStyles.add__note__button}
          onClick={() => createNote()}
        >
          Add note
          <img src={addIcon} alt="" className={stageStyles.add__button__img} />
        </Box>
      </Box>
      {boardSection.boardNotes
        .sort((a: any, b: any) => (a.createdAt < b.createdAt ? 1 : -1))
        .map((note: any) => (
          <ThinkNote
            note={note}
            key={note.id}
            setFocusedNoteRef={setFocusedNoteRef}
            focusedNoteRef={focusedNoteRef}
          />
        ))}
    </Container>
  );
};

export default ThinkColumn;
