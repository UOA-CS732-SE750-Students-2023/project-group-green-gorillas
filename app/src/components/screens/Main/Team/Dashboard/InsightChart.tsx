import { Box, Grid, Paper, Typography } from "@mui/material";
import { Insight } from "../../../../../types/insights";

type Props = {
  insight: Insight | null;
};

export const InsightChart = ({ insight }: Props) => {
  return (
    <Box
      component="div"
      sx={{
        bgcolor: "#F5F7F9",
        padding: 3,
        borderRadius: 2,
        justifyItems: "center",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        noWrap
        component="div"
        sx={{ marginBottom: 2 }}
      >
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 120,
            }}
          >
            {" "}
            Total Outstanding Action Items
            <Typography>{insight?.outstandingActionItemCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 120,
            }}
          >
            {" "}
            Completed Action Items
            <Typography>{insight?.completedActionItemCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 120,
            }}
          >
            {" "}
            Total Action Items
            <Typography>
              {insight?.outstandingActionItemCount &&
                insight?.outstandingActionItemCount +
                  insight?.completedActionItemCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 80,
            }}
          >
            Progeress
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
