import { Container } from "@mui/material";
import React from "react";
import stageStyles from "../styles/stage.module.css";
import ThinkColumn from "./ThinkColumn";

const retros = [
  {
    type: "Start, Stop, Continue",
    shortDesc: "Come up with practical ideas for team based improvement.",
    colShortDesc: "We should...",
    description:
      "When you want to get down to the fundamentals, Start Stop Continue is a simple technique for an action-oriented retrospective meeting that encourages participants to come up with practical ideas for team-based improvement and action items you implement right away.",
    columns: [
      {
        name: "Start",
        description:
          "Things that the team thinks would have a positive impact on the team if they were started.",
        shortDesc: "We should...",
      },
      {
        name: "Stop",
        description:
          "Things within the team’s workflow or process that aren’t helping the team to achieve their goals and should be stopped.",
        shortDesc: "We should...",
      },
      {
        name: "Continue",
        description:
          "Things that are already worked well in the previous iteration and should stay in the workflow.",
        shortDesc: "We should...",
      },
    ],
  },
  {
    type: "Went Well, Didn't go Well",
    shortDesc: "Focus on your team's strengths and weaknesses.",
    colShortDesc: "Something...",
    description:
      "Use the Mad Sad Glad retrospective template to check on your team's emotional wellbeing. Allow your team members to analyze the positive and negative emotions they may have experienced during past projects. The mad sad glad template will allow you to build a positive team dynamic that will improve communication and increase productivity in the long run.",
    columns: [
      {
        shortDesc: "Something...",
        name: "That Went Well",
        description:
          "Things that the team thinks went well over the prior iteration.",
      },
      {
        shortDesc: "Something...",
        name: "That Didn't go Well",
        description:
          "Things that the team thinks didn't go well over the prior iteration.",
      },
    ],
  },
  {
    type: "Mad, Sad, Glad",
    shortDesc: "Figure out how the team is currently feeling.",
    colShortDesc: "Makes me...",
    description:
      "The what went well, what didn't go well retrospective technique keeps teams focused on their activities over the prior iteration and how they can boost their efficiency and productivity to drive continuous improvement. The exercise helps focus the discussion and is a great tool for new and developing teams to improve performance and quality the next iteration of a project.",
    columns: [
      {
        shortDesc: "Makes me...",
        name: "Mad",
        description:
          "Things that the team found frustrating in the last iteration.",
      },
      {
        shortDesc: "Makes me...",
        name: "Sad",
        description:
          "Things that the team found disappointing in the last iteration.",
      },
      {
        shortDesc: "Makes me...",
        name: "Glad",
        description:
          "‍Things that made the team happy and excited in the last iteration.",
      },
    ],
  },
];

const Think = (retroData: any, setRetroData: any) => {
  return (
    <Container className={stageStyles.columns__wrapper}>
      {retros[0].columns.map((column, i) => (
        <ThinkColumn
          key={i}
          title={column.name}
          desc={column.shortDesc}
          retroData={retroData}
          setRetroData={setRetroData}
        />
      ))}
    </Container>
  );
};

export default Think;
