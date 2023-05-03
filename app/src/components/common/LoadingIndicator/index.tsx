import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const LoadingIndicator = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
