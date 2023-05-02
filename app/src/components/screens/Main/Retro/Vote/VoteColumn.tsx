import React from "react";
import VoteGroup from "./VoteGroup";
import VoteNote from "./VoteNote";
import stageStyles from "../styles/stage.module.css";
import { Box } from "@mui/material";

function VoteColumn({ column }: any) {
  return (
    <Box className={stageStyles.column}>
      <Box className={stageStyles.column__header}>
        <div>
          <Box className={stageStyles.select__heading}>
            {column.description}
          </Box>
          <Box className={stageStyles.heading}>{column.name}</Box>
        </div>
      </Box>
      {column.groups.map((group: any) => {
        return (
          <VoteGroup
            key={group.id}
            name={group.note}
            items={group.items}
            votes={10}
            setVotes={() => {}}
            id={group.id}
          />
        );
      })}
      {column.boardNotes.map((item: any) => (
        <VoteNote note={item} />
      ))}
    </Box>
  );
}

export default VoteColumn;
