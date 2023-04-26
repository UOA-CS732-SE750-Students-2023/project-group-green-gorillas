import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import { Timer } from "./Timer";

const stages = ["Think", "Group", "Vote", "Discuss"];
// let breadcrumbStages = [];

function Stage() {
  const [retroData, setRetroData] = useState([]);
  const [groups, setGroups] = useState({});
  const [discItems, setDiscItems] = useState([]);
  const stageDigits = ["One", "Two", "Three", "Four"];
  // breadcrumbStages = stages.slice(0, stage);

  // const stageDisplay = [
  //   <Think retro={retro} retroData={retroData} setRetroData={setRetroData} />,
  //   <Group retro={retro} retroData={retroData} setGroups={setGroups} />,
  //   <Vote retro={retro} groups={groups} setDiscItems={setDiscItems} />,
  //   <Discuss
  //     retro={retro}
  //     items={discItems}
  //     actionItems={actionItems}
  //     setActionItems={setActionItems}
  //   />,
  // ];

  console.log(groups);

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "calc(100% - 80px)",
        position: "relative",
        boxSizing: "border-box",
        padding: 4,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
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
        <Box
          sx={{
            fontSize: 24,
            color: "#333333",
            fontWeight: "bold",
            paddingRight: 3,
          }}
        >
          {/* Stage {stageDigits[stage]}: {stages[stage]} */}
          Stage
        </Box>
        <Timer startTime={180} />
      </Box>
      {/* {stageDisplay[stage]} */}
      {/* <Toolbar stage={stage} setStage={setStage} /> */}
    </Container>
  );
}

export default Stage;
