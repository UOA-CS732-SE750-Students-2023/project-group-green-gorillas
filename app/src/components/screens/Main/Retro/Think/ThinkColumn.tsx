import { Box, Button, Container, Input, TextareaAutosize } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import stageStyles from "../styles/stage.module.css";
import addIcon from "../../../../../assets/add.svg";
import { ThinkNote } from "./ThinkNote";
import { request } from "../../../../../api/request";
import {
  ADD_RETRO_NOTE,
  DELETE_SECTION,
  UPDATE_SECTION_DESC,
  UPDATE_SECTION_NAME,
} from "../../../../../api/api";
import { debounce } from "../../../../../utils/debounce";

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
  teamRole,
}: any) => {
  const [sectionName, setSectionName] = useState("");
  const [sectionDesc, setSectionDesc] = useState("");

  useEffect(() => {
    setSectionDesc(boardSection.description);
  }, [boardSection.description]);

  useEffect(() => {
    setSectionName(boardSection.name);
  }, [boardSection.name]);

  const boardSectionNameRequestDebounce = useMemo(() => {
    return debounce(1000);
  }, []);
  const createNote = async () => {
    await request.post(ADD_RETRO_NOTE, {
      boardId: boardSection.boardId,
      boardSectionId: boardSection.id,
      teamId: boardSection.teamId,
      boardNoteType: BoardNoteType.NORMAL,
      boardNoteColor: colors[Math.floor(colors.length * Math.random())],
    });
  };

  const updateBoardSectionName = async (sectionName: string) => {
    await request.patch(UPDATE_SECTION_NAME, {
      boardSectionId: boardSection.id,
      boardId: boardSection.boardId,
      name: sectionName,
    });
  };

  const updateBoardSectionDesc = async (sectionDesc: string) => {
    await request.patch(UPDATE_SECTION_DESC, {
      boardSectionId: boardSection.id,
      boardId: boardSection.boardId,
      description: sectionDesc,
    });
  };

  const onChangeBoardSecionName = async (e: any) => {
    const newSectionName = e.target.value;

    setSectionName(newSectionName);

    boardSectionNameRequestDebounce(() =>
      updateBoardSectionName(newSectionName)
    );
  };

  const onChangeSectionDescription = async (e: any) => {
    const newSectionDescription = e.target.value;

    setSectionDesc(newSectionDescription);
    boardSectionNameRequestDebounce(() =>
      updateBoardSectionDesc(newSectionDescription)
    );
  };

  const deleteColumn = async () => {
    await request.delete(DELETE_SECTION(boardSection.id, boardSection.boardId));
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
          <TextareaAutosize
            className={stageStyles.section_heading}
            value={sectionDesc}
            autoFocus={true}
            disabled={teamRole === "MEMBER"}
            onChange={onChangeSectionDescription}
            placeholder={"Add New Description"}
          />
          <TextareaAutosize
            className={stageStyles.section_name}
            value={sectionName}
            onChange={onChangeBoardSecionName}
            autoFocus={true}
            disabled={teamRole === "MEMBER"}
            placeholder={"Add New Name"}
          />
          {teamRole !== "MEMBER" && (
            <Button
              onClick={deleteColumn}
              variant="text"
              color="error"
              sx={{ marginTop: -1, marginBottom: -1 }}
            >
              Delete
            </Button>
          )}
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
        ?.sort((a: any, b: any) => (a.createdAt < b.createdAt ? 1 : -1))
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
