import { Container } from "@mui/material";
import React from "react";
import stageStyles from "../styles/stage.module.css";
import ThinkColumn from "./ThinkColumn";

type Props = {
  retro: any;
  retroData: any;
  setRetroData: any;
};

const Think = ({ retro, retroData, setRetroData }: Props) => {
  return (
    <Container
      className={stageStyles.columns__wrapper}
      disableGutters
      maxWidth="false"
    >
      {retro.columns.map((column: any, i: number) => (
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
