import React from "react";
import { Droppable } from "react-beautiful-dnd";
import GroupNote from "./GroupNote";
import stageStyles from "../styles/stage.module.css";
import styles from "../styles/styles.module.css";
import Group from "./Group";
import { Box } from "@mui/material";

function GroupColumn({ id, column }: any) {
  return (
    <Box className={stageStyles.column}>
      <Box className={stageStyles.column__header}>
        <div>
          <Box className={styles.select__heading}>{column.description}</Box>
          <Box className={styles.heading}>{column.name}</Box>
        </div>
      </Box>
      {column.groups.map(
        (group: any, index: any) =>
          group.items.length !== 0 && (
            <Group
              colId={id}
              id={group.id}
              index={index}
              items={group.items}
              key={group.id}
              // setGroupName={setGroupName}
              name={group.note}
            />
          )
      )}
      <Droppable droppableId={id} isCombineEnabled>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ height: "100%" }}
            >
              {column.boardNotes.map((item: any, index: any) => (
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

export default GroupColumn;
