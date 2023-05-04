import { Box, Divider, Grid, Skeleton } from "@mui/material";
import { AvatarSkeleton } from "./AvatarSkeleton";

export const TeamSkeleton = () => {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 8, width: "100%" }}>
      <Skeleton variant="rounded" width={210} height={40} sx={{ marginY: 2 }} />
      <AvatarSkeleton />
      <Divider sx={{ marginY: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {" "}
          <Box
            sx={{
              bgcolor: "#F5F7F9",
              padding: 3,
              borderRadius: 2,
              justifyItems: "center",
              height: 800,
            }}
          ></Box>
        </Grid>
        <Grid item xs={8}>
          {" "}
          <Box
            sx={{
              bgcolor: "#F5F7F9",
              padding: 3,
              borderRadius: 2,
              justifyItems: "center",
              height: 800,
            }}
          ></Box>
        </Grid>
      </Grid>
    </Box>
  );
};
