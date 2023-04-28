import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import stageStyles from "./styles/stage.module.css";
import styles from "./styles/styles.module.css";
import Think from "./Think";
import { Timer } from "./Timer";

type Props = {
  retro: any;
  stage: any;
  setStage: any;
  actionItems: any;
  setActionItems: any;
};

const stages = ["Think", "Group", "Vote", "Discuss"];
// let breadcrumbStages = [];

function Stage({ retro, stage, setStage, actionItems, setActionItems }: Props) {
  const [retroData, setRetroData] = useState([]);
  const [groups, setGroups] = useState({});
  const [discItems, setDiscItems] = useState([]);
  const stageDigits = ["One", "Two", "Three", "Four"];
  // breadcrumbStages = stages.slice(0, stage);

  const stageDisplay = [
    <Think retro={retro} retroData={retroData} setRetroData={setRetroData} />,
    // <Group retro={retro} retroData={retroData} setGroups={setGroups} />,
    // <Vote retro={retro} groups={groups} setDiscItems={setDiscItems} />,
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
      <Box className={styles.flex__right}>
        {/* {stage > 0 && (
          <div className="stage__breadcrumbs">
            {breadcrumbStages.map((breadcrumb) => (
              <div className="stage__breadcrumb">
                {breadcrumb}
                <div className="breadcrumb__arrow" />
              </div>
            ))}
          </div>
        )} */}
        <Box className={styles.heading}>
          {/* Stage {stageDigits[stage]}: {stages[stage]} */}
          Stage {stageDigits[stage]}: {stages[stage]}
        </Box>
        <Timer startTime={180} />
      </Box>
      {stageDisplay[stage]}
      {/* <Toolbar stage={stage} setStage={setStage} /> */}
    </Container>
  );
}

export default Stage;
