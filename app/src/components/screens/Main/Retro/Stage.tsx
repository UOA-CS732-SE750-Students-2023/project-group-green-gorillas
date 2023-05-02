import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import Discuss from "./Discuss";
import Group from "./Group";
import stageStyles from "./styles/stage.module.css";
import styles from "./styles/styles.module.css";
import Think from "./Think";
import { Timer } from "./Timer";
import Toolbar from "./Toolbar";
import Vote from "./Vote";
import { Finalized } from "./Finalized";

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
};

function Stage({ retro }: Props) {
  const stageDisplay: any = {
    [RetroStage.THINK]: <Think retro={retro} />,
    [RetroStage.GROUP]: <Group retro={retro} />,
    [RetroStage.VOTE]: <Vote retro={retro} />,
    [RetroStage.DISCUSS]: <Discuss retro={retro} />,
    [RetroStage.FINALIZE]: <Finalized retro={retro} />,
  };

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
        <Timer startTime={180} />
      </Box>
      {stageDisplay[retro.stage]}
      {retro.stage !== RetroStage.FINALIZE && <Toolbar retro={retro} />}
    </Container>
  );
}

export default Stage;
