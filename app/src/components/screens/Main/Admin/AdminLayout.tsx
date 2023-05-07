import { Grid } from "@mui/material";
import { LeftNavBar } from "../../../common/LeftNavBar";
import Org from "./OrgManagement/org";
import React from "react";

type Props = {
  children: JSX.Element;
};

export const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <LeftNavBar />
      </Grid>
      <Grid item xs={8}>
        {children}
      </Grid>
    </Grid>
  );
};
