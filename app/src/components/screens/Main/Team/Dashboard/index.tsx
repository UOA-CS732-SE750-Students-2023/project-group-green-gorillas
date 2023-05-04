import React, { useEffect, useState } from "react";
import {
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Avatar } from "../../../../common/Avatar";
import { useTeam } from "../../../../../hooks/useTeam";
import { useActionItems } from "../../../../../hooks/useActionItems";
import { useInsight } from "../../../../../hooks/useInsight";
import { useHistory, useParams } from "react-router-dom";
import { LoadingIndicator } from "../../../../common/LoadingIndicator";

// Icon
import SortIcon from "@mui/icons-material/Sort";

import AddIcon from "@mui/icons-material/Add";
import { MainScreenPath } from "../../index";
import { useCurrentUser } from "../../../../../hooks/useCurrentUser";
import { useTeamRole } from "../../../../../hooks/useTeamRole";
import { request } from "../../../../../api/request";
import { InProgressRetro } from "./InProgressRetro";
import { useInProgressRetro } from "../../../../../hooks/useInProgressRetro";
import { TeamMembers } from "./TeamMembers";
import { NewRetroButton } from "./NewRetroButton";
import { TeamScreenLoading } from "./TeamScreenLoading";
import { ActionList } from "./ActionList";
import { InsightChart } from "./InsightChart";

export const TeamDashboardScreen = () => {
  const { teamId } = useParams<{ teamId: string }>();

  const history = useHistory();
  const { user, isAdmin } = useCurrentUser();

  // console.log("selectedTeam:", selectedTeam);

  const { team, loading } = useTeam(teamId);
  // console.log(team);

  const handleChange = (event: SelectChangeEvent) => {
    history.replace(`${MainScreenPath.TEAM}/${event.target.value}`);
  };
  const { teamRole } = useTeamRole(teamId);

  // useEffect(() => {
  //   request.put("http://localhost:8080/api/user/current", {
  //     displayName: "Shunyuan",
  //     firstName: "AAA",
  //     lastName: "VBBB",
  //     phone: "123123",
  //     address: "6 coventry way",
  //     gender: true,
  //   });
  // }, []);

  const {
    isLoading,
    actionItems,
    getActionItems,
    updateActionItems,
    deleteActionItems,
  } = useActionItems(teamId || "");

  const [showAll, setShowAll] = useState<boolean>(true);

  const currentUserActionItems = actionItems?.filter((item) =>
    item.assignees.some((assignee) => assignee.id === user?.id)
  );

  const { insight, insightLoading } = useInsight(teamId);

  // In progress Retro
  const { inProgressRetro } = useInProgressRetro(teamId);

  return (
    <>
      {loading ? (
        <Box sx={{ flexGrow: 1, marginTop: 5, width: "100%" }}>
          <LoadingIndicator />
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, marginTop: 5, width: "100%" }}>
          {" "}
          <Toolbar />
          {/* Team Member list & New Retro Button */}
          <Grid
            container
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
              height: 108,
            }}
          >
            <Grid
              item
              xs={4}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                noWrap
                component="div"
                sx={{ marginBottom: 2 }}
              >
                {team?.name}
              </Typography>
              <TeamMembers />
            </Grid>
            <Grid item xs={8} alignItems="flex-start">
              <NewRetroButton teamId={teamId} teamRole={teamRole} />
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: 2, marginBottom: 5 }} />
          <InProgressRetro />
          {/* Sort to my action items */}
          <Grid
            container
            sx={{
              height: 500,
              alignItems: "flex-start",
            }}
            spacing={2}
          >
            <Grid item xs={4}>
              <Box
                component="div"
                sx={{
                  bgcolor: "#F5F7F9",
                  padding: 3,
                  borderRadius: 2,
                  justifyItems: "center",
                }}
              >
                <ActionList teamId={teamId} user={user} teamRole={teamRole} />
              </Box>
            </Grid>
            {/* Charts */}
            <Grid item xs={8}>
              <InsightChart insight={insight} />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
