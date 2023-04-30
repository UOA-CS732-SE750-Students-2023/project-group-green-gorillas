import React, { useState } from "react";
import stageStyles from "../styles/stage.module.css";

import { DragDropContext } from "react-beautiful-dnd";
import { onDragEnd } from "./useGroup";

import GroupColumn from "./GroupColumn";
import { Box } from "@mui/material";

function Group({ retro, retroData, setGroups }: any) {
  console.log(retro);
  const [columns, setColumns] = useState(() => {
    let newCols = {};
    retro.columns.forEach((col) => {
      newCols[col.name] = {
        name: col.name,
        shortDesc: col.shortDesc,
        items: retroData.filter((item) => item.column === col.name),
        groups: [],
      };
    });
    setGroups(newCols);
    return newCols;
  });

  function setGroupName(colId, groupId, newName) {
    const col = columns[colId];
    const colGroups = [...col.groups];
    let group = {};
    let groupIndex = 0;
    colGroups.forEach((g, index) => {
      if (g.id === groupId) {
        group = g;
        groupIndex = index;
        return;
      }
    });
    group.name = newName;
    colGroups[groupIndex] = group;
    setColumns({
      ...columns,
      [colId]: {
        ...col,
        groups: colGroups,
      },
    });
  }

  return (
    <Box className={stageStyles.columns__wrapper} component="div">
      <DragDropContext
        onDragEnd={(result) => {
          let newColumns = onDragEnd(columns, result);
          setColumns(newColumns);
          setGroups(newColumns);
        }}
      >
        {Object.entries(columns).map(([id, column], index) => {
          return (
            <GroupColumn
              id={id}
              column={column}
              key={index}
              setGroupName={setGroupName}
            />
          );
        })}
      </DragDropContext>
    </Box>
  );
}

export default Group;
