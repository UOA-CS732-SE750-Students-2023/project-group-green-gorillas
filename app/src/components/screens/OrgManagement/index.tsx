import React, { useEffect } from "react";
import Org from "./org";
import { LeftNavBar } from "../../common/LeftNavBar";
import { Box, Grid } from "@mui/material";

export const OrgManagementScreen = () => {

  return (
    <Grid container>
      <Grid item xs={2}>
        <LeftNavBar />
      </Grid>
      <Grid item xs={10}>
        <Org />
      </Grid>
    </Grid>
  );
};