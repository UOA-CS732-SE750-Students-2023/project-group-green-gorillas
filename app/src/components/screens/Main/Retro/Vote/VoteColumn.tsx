import React from "react";
import VoteGroup from "./VoteGroup";
import VoteNote from "./VoteNote";
import stageStyles from "../styles/stage.module.css";
import { Box } from "@mui/material";

function VoteColumn({ title, desc, items, setVotes }: any) {
  console.log(items);
  return (
    <Box className={stageStyles.column}>
      <Box className={stageStyles.column__header}>
        <div>
          <Box className={stageStyles.select__heading}>{desc}</Box>
          <Box className={stageStyles.heading}>{title}</Box>
        </div>
      </Box>
      {items
        .filter((item) => item.column === title)
        .map((item) =>
          item.id.includes("group") ? (
            <VoteGroup
              name={item.name}
              items={item.items}
              votes={item.votes}
              setVotes={setVotes}
              id={item.id}
            />
          ) : (
            <VoteNote note={item} setVotes={setVotes} />
          )
        )}
    </Box>
  );
}

export default VoteColumn;
