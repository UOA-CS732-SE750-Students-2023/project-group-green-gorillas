import { Box } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import stageStyles from "../styles/stage.module.css";

import dragIcon from "../../../../../assets/drag.svg";

function GroupNote({ id, index, note }: any) {
  return (
    <Draggable draggableId={id} index={index} key={id}>
      {(provided, snapshot) => {
        return (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={
              snapshot.combineTargetFor
                ? [
                    stageStyles.note__wrapper,
                    stageStyles.note__wrapper__combining,
                  ]
                : stageStyles.note__wrapper
            }
            style={{
              marginBottom: "8px",
              ...provided.draggableProps.style,
            }}
          >
            <Box
              className={
                [
                  stageStyles.note__container,
                  stageStyles.note__container__group,
                  stageStyles[`note__container__${note.color}`],
                ] as any
              }
            >
              <Box
                component="img"
                src={dragIcon}
                alt=""
                className={stageStyles.drag__icon}
              />
              {note.value}
            </Box>
          </Box>
        );
      }}
    </Draggable>
  );
}

export default GroupNote;
