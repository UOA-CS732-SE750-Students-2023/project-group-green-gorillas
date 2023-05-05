import { Box, Divider, Grid, Skeleton } from "@mui/material";

export const RetroHistorySkeleton = () => {
  const array = Array.from(new Array(8));
  return (
    <Box sx={{ flexGrow: 1, marginTop: 8, width: "100%" }}>
      <Skeleton variant="rounded" width={210} height={40} sx={{ marginY: 2 }} />
      <Divider sx={{ marginY: 2 }} />
      <Grid container spacing={2}>
        {array.map((item, index) => (
          <Grid item xs={3} key={index}>
            <Skeleton variant="rounded" height={110} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
