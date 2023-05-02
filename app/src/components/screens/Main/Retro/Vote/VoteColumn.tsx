import React from "react";
import VoteGroup from "./VoteGroup";
import VoteNote from "./VoteNote";
import stageStyles from "../styles/stage.module.css";
import { Box } from "@mui/material";
import { request } from "../../../../../api/request";
import { UNVOTE_NOTE, VOTE_NOTE } from "../../../../../api/api";

function VoteColumn({ column }: any) {
  const vote = async (boardNoteId: string, boardId: string) => {
    await request.post(VOTE_NOTE, {
      boardNoteId,
      boardId,
    });
  };

  const unvote = async (boardNoteId: string) => {
    await request.delete(`${UNVOTE_NOTE}/${boardNoteId}`);
  };

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
            id={group.id}
            retroId={group.boardId}
            votes={group.boardNoteVotes}
            vote={vote}
            unvote={unvote}
          />
        );
      })}
      {column.boardNotes.map((item: any) => (
        <VoteNote vote={vote} unvote={unvote} note={item} />
      ))}
    </Box>
  );
}

export default VoteColumn;
