import { Box, Container } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Discuss from "./Discuss";
import Group from "./Group";
import stageStyles from "./styles/stage.module.css";
import styles from "./styles/styles.module.css";
import Think from "./Think";
import { Timer } from "./Timer";
import Toolbar from "./Toolbar";
import Vote from "./Vote";
import { Finalized } from "./Finalized";
import { DateTime } from "luxon";
import { Review } from "./Review";

const stageDigits = ["One", "Two", "Three", "Four", "Five", "Six"];

export enum RetroStage {
  THINK = "Think",
  GROUP = "Group",
  VOTE = "Vote",
  DISCUSS = "Discuss",
  REVIEW = "Review",
  FINALIZE = "Finalized",
}

type Props = {
  retro: any;
  teamRole: any;
};

function Stage({ retro, teamRole }: Props) {
  const stageDisplay: any = {
    [RetroStage.THINK]: <Think retro={retro} teamRole={teamRole} />,
    [RetroStage.GROUP]: <Group retro={retro} />,
    [RetroStage.VOTE]: <Vote retro={retro} />,
    [RetroStage.DISCUSS]: <Discuss retro={retro} teamRole={teamRole} />,
    [RetroStage.REVIEW]: <Review retro={retro} />,
    [RetroStage.FINALIZE]: <Finalized retro={retro} />,
  };

  const [timer, setTimer] = useState(0);

  const intervalRef = useRef<any>(null);

  useEffect(() => {
    const timerExpiredTimeStamp = retro?.sessionPayload?.timerExpiredTimeStamp;

    if (!timerExpiredTimeStamp) {
      setTimer(0);
      return;
    }

    const timeLeft = Math.floor(
      DateTime.fromMillis(timerExpiredTimeStamp)
        .minus({ second: DateTime.now().toSeconds() })
        .toSeconds()
    );

    setTimer(timeLeft <= 0 ? 0 : timeLeft);

    intervalRef.current = setInterval(() => {
      setTimer((timer) => {
        if (timer >= 1) {
          return timer - 1;
        } else {
          if (intervalRef?.current) {
            clearInterval(intervalRef.current);
          }
          return timer;
        }
      });
    }, 1000);

    return () => {
      if (intervalRef?.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [retro?.sessionPayload?.timerExpiredTimeStamp]);

  return (
    <Container
      className={stageStyles.stage__wrapper}
      disableGutters
      // @ts-ignore
      maxWidth="false"
    >
      <Box className={styles.flex__right} component="div">
        {Object.values(RetroStage).findIndex((stage) => stage === retro.stage) >
          0 && (
          <Box className={stageStyles.stage__breadcrumbs}>
            {Object.values(RetroStage)
              .slice(
                0,
                Object.values(RetroStage).findIndex(
                  (stage) => stage === retro.stage
                )
              )
              .map((breadcrumb, i) => (
                <Box key={i} className={stageStyles.stage__breadcrumb}>
                  {breadcrumb}
                  <Box className={stageStyles.breadcrumb__arrow} />
                </Box>
              ))}
          </Box>
        )}
        <Box className={styles.heading} component="div">
          Stage{" "}
          {
            stageDigits[
              Object.values(RetroStage).findIndex(
                (stage) => stage === retro.stage
              )
            ]
          }
          : {retro.stage}
        </Box>
        <Timer time={timer} />
      </Box>
      {stageDisplay[retro.stage]}
      {retro.stage !== RetroStage.FINALIZE && (
        <Toolbar teamRole={teamRole} retro={retro} timer={timer} />
      )}
    </Container>
  );
}

export default Stage;
