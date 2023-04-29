import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import Group from "./Group";
import stageStyles from "./styles/stage.module.css";
import styles from "./styles/styles.module.css";
import Think from "./Think";
import { Timer } from "./Timer";
import Toolbar from "./Toolbar";
import Vote from "./Vote";

type Props = {
  retro: any;
  stage: any;
  setStage: any;
  actionItems: any;
  setActionItems: any;
};

const stages = ["Think", "Group", "Vote", "Discuss"];
let breadcrumbStages = [];

function Stage({ retro, stage, setStage, actionItems, setActionItems }: Props) {
  const [retroData, setRetroData] = useState([]);
  const [groups, setGroups] = useState({});
  const [discItems, setDiscItems] = useState([]);
  const stageDigits = ["One", "Two", "Three", "Four"];
  breadcrumbStages = stages.slice(0, stage);

  const stageDisplay = [
    <Think retro={retro} retroData={retroData} setRetroData={setRetroData} />,
    <Group retro={retro} retroData={retroData} setGroups={setGroups} />,
    <Vote retro={retro} groups={groups} setDiscItems={setDiscItems} />,
    // <Discuss
    //   retro={retro}
    //   items={discItems}
    //   actionItems={actionItems}
    //   setActionItems={setActionItems}
    // />,
  ];
  return (
    <Container
      className={stageStyles.stage__wrapper}
      disableGutters
      maxWidth="false"
    >
      <Box className={styles.flex__right} component="div">
        {stage > 0 && (
          <Box className={stageStyles.stage__breadcrumbs}>
            {breadcrumbStages.map((breadcrumb) => (
              <Box className={stageStyles.stage__breadcrumb}>
                {breadcrumb}
                <Box className={stageStyles.breadcrumb__arrow} />
              </Box>
            ))}
          </Box>
        )}
        <Box className={styles.heading} component="div">
          Stage {stageDigits[stage]}: {stages[stage]}
        </Box>
        <Timer startTime={180} />
      </Box>
      {stageDisplay[stage]}
      <Toolbar stage={stage} setStage={setStage} />
    </Container>
  );
}

export default Stage;
