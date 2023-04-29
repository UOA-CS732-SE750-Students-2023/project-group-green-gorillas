import { Box } from "@mui/material";
import React from "react";

import voteUp from "../../../../assets/upvote.svg";
import voteDown from "../../../../assets/votedown.svg";
import stageStyles from "../styles/stage.module.css";

function VoteNote({ note, setVotes }: any) {
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
        {note.value}
      </Box>
      <Box className={stageStyles.votes__wrapper} style={{ marginTop: "8px" }}>
        <Box className={stageStyles.vote__buttons}>
          <div
            className={stageStyles.vote__button}
            onClick={() => setVotes("add", note.id)}
          >
            <Box
              component="img"
              src={voteUp}
              alt=""
              className={stageStyles.vote__button__img}
            />
          </div>
          <Box
            className={
              note.votes > 0
                ? stageStyles.vote__button
                : stageStyles.vote__button__disabled
            }
            onClick={() => setVotes("rem", note.id)}
          >
            <Box
              component="img"
              src={voteDown}
              alt=""
              className={stageStyles.vote__button__img}
            />
          </Box>
        </Box>
        <Box className={stageStyles.votes}>{note.votes} votes</Box>
      </Box>
    </Box>
  );
}

export default VoteNote;
