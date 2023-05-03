import React, { useState } from "react";
import VoteColumn from "./VoteColumn";
import stageStyles from "../styles/stage.module.css";
import { Box } from "@mui/material";
import { useAggregateRetro } from "../utils/use-aggregate-retro";

function Vote({ retro }: any) {
  const aggregateRetro = useAggregateRetro(retro);

  return (
    <Box className={stageStyles.columns__wrapper}>
      {aggregateRetro.boardSections
        .sort((a: any, b: any) => a.order - b.order)
        .map((column: any) => (
          <VoteColumn key={column.id} column={column} />
        ))}
    </Box>
  );
}

export default Vote;
