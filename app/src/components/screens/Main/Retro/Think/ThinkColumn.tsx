import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import stageStyles from "../styles/stage.module.css";
import styles from "../styles/styles.module.css";
import addIcon from "../../../../../assets/add.svg";
import { ThinkNote } from "./ThinkNote";

const ThinkColumn = ({ title, desc, retroData, setRetroData }: any) => {
  const [newestNote, setNewestNote] = useState(0);
  const colors = ["pink", "blue", "yellow"];

  function createNote() {
    const newRetroData = [...retroData];
    newRetroData.push({
      column: title,
      value: "",
      color: colors[Math.floor(colors.length * Math.random())],
      id: `item-${newRetroData.length}`,
      votes: 0,
    });
    setNewestNote(newRetroData.length - 1);
    setRetroData(newRetroData);
  }

  function updateNote(i: number, e: any) {
    let newRetroData = [...retroData];
    newRetroData[i].value = e.target.value;
    setRetroData(newRetroData);
  }

  function deleteNote(i: number) {
    let newRetroData = [...retroData];
    newRetroData.splice(i, 1);
    setRetroData(newRetroData);
  }
  return (
    <Container className={stageStyles.column} disableGutters maxWidth="false">
      <Box className={stageStyles.column__header}>
        <Box>
          <Box className={styles.select__heading}>{desc}</Box>
          <Box className={styles.heading}>{title}</Box>
        </Box>
        <Box
          className={stageStyles.add__note__button}
          onClick={() => createNote()}
        >
          Add note
          <img src={addIcon} alt="" className={stageStyles.add__button__img} />
        </Box>
      </Box>
      {!!retroData &&
        retroData
          .filter((item: any) => item.column === title)
          .map((note: any, i: number) => (
            <ThinkNote
              note={note}
              i={retroData.indexOf(note)}
              updateNote={updateNote}
              deleteNote={deleteNote}
              newestNote={newestNote}
              key={i}
            />
          ))}
    </Container>
  );
};

export default ThinkColumn;
