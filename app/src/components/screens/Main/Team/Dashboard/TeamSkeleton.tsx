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
          <Skeleton variant="rounded" height={800} />
        </Grid>
        <Grid item xs={8}>
          {" "}
          <Skeleton variant="rounded" height={800} />
        </Grid>
      </Grid>
    </Box>
  );
};
