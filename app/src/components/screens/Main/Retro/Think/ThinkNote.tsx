import React, { useEffect, useMemo, useRef, useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Box, Container } from "@mui/material";
import stageStyles from "../styles/stage.module.css";
import { request } from "../../../../../api/request";
import { DELETE_RETRO_NOTE, UPDATE_RETRO_NOTE } from "../../../../../api/api";
import { useCurrentUser } from "../../../../../hooks/useCurrentUser";
import { debounce } from "../../../../../utils/debounce";

export const ThinkNote = ({ note, setFocusedNoteRef, focusedNoteRef }: any) => {
  const deleteNote = async () => {
    await request.delete(DELETE_RETRO_NOTE(note.id));
  };

  const updateNote = async (noteValue: string) => {
    await request.patch(UPDATE_RETRO_NOTE, {
      boardNoteId: note.id,
      note: noteValue,
    });
  };

  const [editNote, setEditNote] = useState("");

  useEffect(() => {
    setEditNote(note.note);
  }, [note.note]);

  const { user } = useCurrentUser();

  const isCreatedBySelf = user?.id === note.createdBy;

  const noteUpdateRequestDebounce = useMemo(() => {
    return debounce(500);
  }, []);

  const onNoteChange = async (e: any) => {
    e.preventDefault();
    if (!isCreatedBySelf) return;

    const note = e.target.value;

    setEditNote(note);

    noteUpdateRequestDebounce(() => updateNote(note));
  };

  const hashNote = (note: string) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < note.length; i++) {
      const hash = +note[i] % characters.length;

      result += characters.charAt(hash);
    }

    return result;
  };

  const noteRef: any = useRef();

  const onNoteInputFocus = () => {
    setFocusedNoteRef(noteRef);
  };

  const onNoteInputBlur = () => {
    setFocusedNoteRef(null);
  };

  return (
    <div ref={noteRef}>
      <div
        className={`${
          focusedNoteRef &&
          focusedNoteRef !== noteRef &&
          stageStyles.note__container_blur
        }`}
      >
        <Container className={stageStyles.note__wrapper} disableGutters>
          <Box
            className={
              [
                stageStyles.note__container,
                stageStyles[`note__container__${note.color}`],
                !isCreatedBySelf && stageStyles.note__container_blur,
              ] as any
            }
          >
            <TextareaAutosize
              suppressContentEditableWarning={true}
              placeholder="Type your note here..."
              className={stageStyles.note__textarea}
              value={isCreatedBySelf ? editNote : hashNote(editNote)}
              onChange={onNoteChange}
              disabled={!isCreatedBySelf}
              contentEditable={!isCreatedBySelf}
              autoFocus={true}
              onFocus={onNoteInputFocus}
              onBlur={onNoteInputBlur}
            />
          </Box>
          {isCreatedBySelf ? (
            <Box className={stageStyles.delete__note} onClick={deleteNote}>
              Delete
            </Box>
          ) : (
            <Box className={stageStyles.delete__note}>
              <br />
            </Box>
          )}
        </Container>
      </div>
    </div>
  );
};
