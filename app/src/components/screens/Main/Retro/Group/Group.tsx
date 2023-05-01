import React, { useEffect, useMemo, useState } from "react";

import GroupNote from "./GroupNote";
import stageStyles from "../styles/stage.module.css";

import { Draggable, Droppable } from "react-beautiful-dnd";
import { Box } from "@mui/material";
import { request } from "../../../../../api/request";
import { UPDATE_RETRO_NOTE } from "../../../../../api/api";
import { debounce } from "../../../../../utils/debounce";

function Group({ colId, id, items, index, name }: any) {
  const noteUpdateRequestDebounce = useMemo(() => {
    return debounce(1000);
  }, []);

  const [noteName, setNoteName] = useState("");

  useEffect(() => {
    setNoteName(name);
  }, [name]);

  const updateNote = async (noteValue: string) => {
    await request.patch(UPDATE_RETRO_NOTE, {
      boardNoteId: id,
      note: noteValue,
    });
  };

  const onChangeGroupNameChange = async (e: any) => {
    const newName = e.target.value;

    setNoteName(newName);

    noteUpdateRequestDebounce(() => updateNote(newName));
  };

  return (
    <Box className={stageStyles.notes__group}>
      <Box
        component="input"
        className={stageStyles.group__input}
        value={noteName}
        onChange={onChangeGroupNameChange}
      />
      <Droppable droppableId={id}>
        {(provided, snapshot) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <GroupNote
                  id={item.id}
                  index={index}
                  note={item}
                  key={item.id}
                />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </Box>
  );
}

export default Group;
