import React, { useEffect } from "react";
import User from "./user";
import { Grid } from "@mui/material";
import { LeftNavBar } from "../../common/LeftNavBar";

export const UserManagementScreen = () => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <LeftNavBar />
      </Grid>
      <Grid item xs={10}>
        <User />
      </Grid>
    </Grid>
  );
};