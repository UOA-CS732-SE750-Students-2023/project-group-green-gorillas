import { Box } from "@mui/material";
import React, { useMemo } from "react";

import voteUp from "../../../../../assets/upvote.svg";
import voteDown from "../../../../../assets/votedown.svg";
import stageStyles from "../styles/stage.module.css";
import { useCurrentUser } from "../../../../../hooks/useCurrentUser";

type Props = {
  name: string;
  items: any;
  votes: any;
  retroId: string;
  vote: any;
  id: string;
  unvote: any;
  isSingleRetroHistory?: boolean;
};

function VoteGroup({
  name,
  items,
  votes,
  retroId,
  vote,
  id,
  unvote,
  isSingleRetroHistory,
}: Props) {
  const { user } = useCurrentUser();

  const hasVoted = useMemo(() => {
    return !!votes?.find((vote: any) => vote.userId === user?.id);
  }, [votes, user]);

  return (
    <div style={{ marginBottom: "16px" }}>
      <Box className={stageStyles.notes__group}>
        <Box className={stageStyles.group__heading}>{name}</Box>
        <div>
          {items.map((item: any) => {
            return (
              <Box
                key={item.id}
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
                  {item.note}
                </Box>
              </Box>
            );
          })}
        </div>
      </Box>
      {!isSingleRetroHistory && (
        <Box className={stageStyles.votes__wrapper}>
          <Box className={stageStyles.vote__buttons}>
            {!hasVoted ? (
              <Box
                onClick={() => vote(id, retroId)}
                className={stageStyles.vote__button__after}
              >
                <Box
                  component="img"
                  src={voteUp}
                  alt=""
                  className={stageStyles.vote__button__img}
                />
              </Box>
            ) : (
              <Box
                onClick={() => unvote(id)}
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
          <Box className={stageStyles.votes}>{votes?.length ?? 0} votes</Box>
        </Box>
      )}
    </div>
  );
}

export default VoteGroup;
