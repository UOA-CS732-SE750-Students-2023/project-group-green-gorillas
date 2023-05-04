import { Box, Divider, Grid, Toolbar, Typography } from "@mui/material";
import { useTeam } from "../../../../../hooks/useTeam";
import { useInsight } from "../../../../../hooks/useInsight";
import { useParams } from "react-router-dom";
import { LoadingIndicator } from "../../../../common/LoadingIndicator";

import { useCurrentUser } from "../../../../../hooks/useCurrentUser";
import { useTeamRole } from "../../../../../hooks/useTeamRole";
import { InProgressRetro } from "./InProgressRetro";
import { TeamMembers } from "./TeamMembers";
import { NewRetroButton } from "./NewRetroButton";
import { TeamSkeleton } from "./TeamSkeleton";
import { ActionList } from "./ActionList";
import { InsightChart } from "./InsightChart";

export const TeamDashboardScreen = () => {
  const { teamId } = useParams<{ teamId: string }>();

  const { user } = useCurrentUser();

  const { team, loading } = useTeam(teamId);

  const { teamRole } = useTeamRole(teamId);

  const { insight } = useInsight(teamId);

  return (
    <>
      {loading ? (
        <Box sx={{ flexGrow: 1, marginTop: 5, width: "100%" }}>
          {/* <LoadingIndicator /> */}
          <TeamSkeleton />
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, marginTop: 5, width: "100%" }}>
          {" "}
          <Toolbar />
          <Grid container>
            <Grid item xs={4}>
              <Typography
                variant="h4"
                fontWeight="bold"
                noWrap
                sx={{ marginBottom: 2 }}
              >
                {team?.name}
              </Typography>
              <TeamMembers />
            </Grid>
            <Grid item xs={8}>
              <NewRetroButton teamId={teamId} teamRole={teamRole} />
            </Grid>
          </Grid>
          <Divider sx={{ marginY: 2 }} />
          <InProgressRetro />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <ActionList teamId={teamId} user={user} teamRole={teamRole} />
            </Grid>
            <Grid item xs={8}>
              <InsightChart insight={insight} />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
