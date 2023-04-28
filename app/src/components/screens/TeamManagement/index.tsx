import React, { useEffect } from "react";
import Team from "./team";
import { Grid } from "@mui/material";
import { LeftNavBar } from "../../common/LeftNavBar";

export const TeamManagementScreen = () => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <LeftNavBar />
      </Grid>
      <Grid item xs={10}>
        <Team />
      </Grid>
    </Grid>
  );
};