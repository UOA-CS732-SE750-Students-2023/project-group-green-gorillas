import { Box, Grid, Paper, Typography, styled } from "@mui/material";
import { Insight } from "../../../../../types/insights";
import { PieChart } from "./PieChart";

type Props = {
  insight: Insight | null;
};

export const InsightChart = ({ insight }: Props) => {
  const totalCounts: number | null =
    insight?.outstandingActionItemCount || null;
  const completedCounts: number | null =
    insight?.completedActionItemCount || null;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
        <Grid item xs={7}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography
                    sx={{
                      color: "#797978",
                    }}
                  >
                    Total Action Items
                  </Typography>
                  <Typography variant="h2" sx={{ color: "#1976d2"}}>
                    {insight?.outstandingActionItemCount}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography sx={{ color: "#797978" }}>
                    Completed Action Items
                  </Typography>
                  <Typography variant="h2" sx={{ color: "#1976d2" }}>
                    {insight?.completedActionItemCount}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography sx={{ color: "#797978" }}>
                    Number of Retros
                  </Typography>
                  <Typography variant="h2" sx={{ color: "#1976d2" }}>
                    {insight?.retrospectiveCount}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {" "}
            Progress of Action Items
            <PieChart
              totalCounts={totalCounts}
              completedCounts={completedCounts}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
