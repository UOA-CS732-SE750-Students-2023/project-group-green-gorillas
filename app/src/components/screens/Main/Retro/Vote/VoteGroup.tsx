import { Box } from "@mui/material";
import React from "react";

import voteUp from "../../../../../assets/upvote.svg";
import voteDown from "../../../../../assets/votedown.svg";
import stageStyles from "../styles/stage.module.css";

function VoteGroup({ name, items, votes, setVotes, id }: any) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <Box className={stageStyles.notes__group}>
        <Box className={stageStyles.group__heading}>{name}</Box>
        <div>
          {items.map((item, index) => {
            console.log(item);
            return (
              <Box
                className={stageStyles.note__wrapper}
                style={{ marginBottom: "8px" }}
              >
                <Box
                  className={
                    [
                      stageStyles.note__container,
                      stageStyles[`note__container__${item.color}`],
                    ] as any
                  }
                >
                  {item.value}
                </Box>
              </Box>
            );
          })}
        </div>
      </Box>
      <Box className={stageStyles.votes__wrapper}>
        <Box className={stageStyles.vote__buttons}>
          <Box
            className={stageStyles.vote__button}
            onClick={() => setVotes("add", id)}
          >
            <Box
              component="img"
              src={voteUp}
              alt=""
              className={stageStyles.vote__button__img}
            />
          </Box>
          <Box
            className={
              votes > 0
                ? stageStyles.vote__button
                : stageStyles.vote__button__disable
            }
            onClick={() => setVotes("rem", id)}
          >
            <Box
              component="img"
              src={voteDown}
              alt=""
              className={stageStyles.vote__button__img}
            />
          </Box>
        </Box>
        <Box className={stageStyles.votes}>{votes} votes</Box>
      </Box>
    </div>
  );
}

export default VoteGroup;
