import { Box } from "@mui/material";
import React, { useMemo } from "react";

import voteUp from "../../../../../assets/upvote.svg";
import voteDown from "../../../../../assets/votedown.svg";
import stageStyles from "../styles/stage.module.css";
import { useCurrentUser } from "../../../../../hooks/useCurrentUser";

type Props = {
  note: any;
  vote: any;
  unvote: any;
  isSingleRetroHistory?: boolean;
};

function VoteNote({ note, vote, unvote, isSingleRetroHistory }: Props) {
  const { user } = useCurrentUser();

  const hasVoted = useMemo(() => {
    return !!note.boardNoteVotes.find((vote: any) => vote.userId === user?.id);
  }, [note.boardNoteVotes, user]);

  return (
    <Box className={stageStyles.note__wrapper} style={{ marginBottom: "16px" }}>
      <Box
        className={
          [
            stageStyles.note__container,
            stageStyles[`note__container__${note.color}`],
          ] as any
        }
      >
        {note.note}
      </Box>
      {!isSingleRetroHistory && (
        <Box
          className={stageStyles.votes__wrapper}
          style={{ marginTop: "8px" }}
        >
          <Box className={stageStyles.vote__buttons}>
            {!hasVoted ? (
              <div
                onClick={() => vote(note.id, note.boardId)}
                className={stageStyles.vote__button__after}
              >
                <Box
                  component="img"
                  src={voteUp}
                  alt=""
                  className={stageStyles.vote__button__img}
                />
              </div>
            ) : (
              <Box
                onClick={() => unvote(note.id)}
                className={stageStyles.vote__button}
              >
                <Box
                  component="img"
                  src={voteUp}
                  alt=""
                  className={stageStyles.vote__button__img}
                />
              </Box>
            )}
          </Box>
          <Box className={stageStyles.votes}>
            {note.boardNoteVotes.length} votes
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default VoteNote;
