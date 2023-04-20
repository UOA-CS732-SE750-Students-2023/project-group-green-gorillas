import React from "react";
import { Link, Typography } from "@mui/material";

export const CopyRight = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 8, mb: 4 }}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Retrospective Monster
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
