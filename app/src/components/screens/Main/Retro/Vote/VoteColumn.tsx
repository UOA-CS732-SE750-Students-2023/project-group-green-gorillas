import React from "react";
import VoteGroup from "./VoteGroup";
import VoteNote from "./VoteNote";
import stageStyles from "../styles/stage.module.css";
import { Box } from "@mui/material";
import { request } from "../../../../../api/request";
import { UNVOTE_NOTE, VOTE_NOTE } from "../../../../../api/api";

type Props = {
  column: any;
  isSingleRetroHistory?: boolean;
};

function VoteColumn({ column, isSingleRetroHistory }: Props) {
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
          <Box sx={{ fontSize: 24 }} className={stageStyles.heading}>
            {column.name}
          </Box>
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
            isSingleRetroHistory={isSingleRetroHistory}
          />
        );
      })}
      {column.boardNotes.map((item: any) => (
        <VoteNote
          key={item.id}
          vote={vote}
          unvote={unvote}
          note={item}
          isSingleRetroHistory={isSingleRetroHistory}
        />
      ))}
    </Box>
  );
}

export default VoteColumn;
