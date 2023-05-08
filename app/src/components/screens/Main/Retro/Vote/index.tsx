import React, { useState } from "react";
import VoteColumn from "./VoteColumn";
import stageStyles from "../styles/stage.module.css";
import { Box } from "@mui/material";
import { useAggregateRetro } from "../utils/use-aggregate-retro";

type Props = {
  retro: any;
  isSingleRetroHistory?: boolean;
};

function Vote({ retro, isSingleRetroHistory }: Props) {
  const aggregateRetro = useAggregateRetro(retro);

  return (
    <Box
      className={
        isSingleRetroHistory
          ? stageStyles.singleRetro__columns__wrapper
          : stageStyles.columns__wrapper
      }
    >
      {aggregateRetro.boardSections
        .sort((a: any, b: any) => a.order - b.order)
        .map((column: any) => (
          <VoteColumn
            key={column.id}
            column={column}
            isSingleRetroHistory={isSingleRetroHistory}
          />
        ))}
    </Box>
  );
}

export default Vote;
