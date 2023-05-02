import React, { useEffect, useState } from "react";
import {
  AvatarGroup,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { Avatar } from "../../../../components/common/Avatar/index";
import { useTeam } from "../../../../hooks/useTeam";
import {
  ActionItem,
  ActionItemStatus,
  useActionItems,
} from "../../../../hooks/useActionItems";
import { useInsight } from "../../../../hooks/useInsight";
import { useHistory, useParams } from "react-router-dom";
import { LoadingIndicator } from "../../../common/LoadingIndicator";

// Icon
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";

import AddIcon from "@mui/icons-material/Add";
import { TeamDrawer } from "../../../common/TeamDrawer";
import { MainScreenPath } from "../index";
import { ExpandMore } from "@mui/icons-material";
import { left } from "@popperjs/core";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
// import { ActionItemList } from "./ActionItemList";
import { actionItems } from "../../../../../../platform/src/modules/application/data-seeder/data/action-items";
import { useTeamRole } from "../../../../hooks/useTeamRole";

export const TeamScreen = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const history = useHistory();
  const { user, isAdmin } = useCurrentUser();
  const { team, loading } = useTeam(teamId);
  const { teamRole } = useTeamRole(teamId);
  console.log(teamRole);

  const {
    isLoading,
    actionItems,
    getActionItems,
    updateActionItems,
    deleteActionItems,
  } = useActionItems(teamId);

  // console.log(actionItems);
  const [showAll, setShowAll] = useState<boolean>(true);

  const currentUserActionItems = actionItems?.filter((item) =>
    item.assignees.some((assignee) => assignee.id === user?.id)
  );

  const { insight, insightLoading } = useInsight(teamId);
  // console.log(insight);

  return (
    <Container maxWidth="xl" sx={{ marginTop: 2, display: "flex" }}>
      <TeamDrawer teamId={teamId} />

      {loading ? (
        <LoadingIndicator />
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
              <AvatarGroup sx={{ width: 185 }}>
                {team?.teamMembers?.map((member) => (
                  <Avatar
                    key={member.id}
                    text={`${member.firstName} ${member.lastName}`}
                  />
                ))}
              </AvatarGroup>
            </Grid>
            <Grid item xs={8} alignItems="flex-start">
              <Button
                onClick={() =>
                  history.push(`${MainScreenPath.Template}/${teamId}`)
                }
                variant="contained"
                startIcon={<AddIcon />}
              >
                New Retro
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: 2, marginBottom: 5 }} />
          {/* Sort to my action items */}
          <Grid
            container
            sx={{
              height: 500,
              alignItems: "flex-start",
            }}
            spacing={2}
          >
            {/* Outstanding Action Items */}
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
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      noWrap
                      component="div"
                      justifyContent="flex-end"
                      sx={{ marginBottom: 2 }}
                    >
                      {showAll ? "Team Action Items" : "My Action Items"}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      color="primary"
                      sx={{ marginLeft: "auto" }}
                      size="small"
                      component="div"
                      aria-label="Sort by user"
                      onClick={() => setShowAll(!showAll)}
                    >
                      <SortIcon />
                    </IconButton>
                  </Grid>
                </Grid>

                {showAll ? (
                  <Stack spacing={2}>
                    {actionItems?.map((actionItem) => (
                      <Card key={actionItem.id} sx={{ maxWidth: 450 }}>
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {actionItem.note}
                          </Typography>
                          <Chip
                            label={actionItem.status}
                            color="success"
                            size="small"
                          />

                          <Typography color="text.secondary" component="div">
                            {actionItem.createdAt.slice(0, 10)}
                          </Typography>
                          <AvatarGroup max={4}>
                            {actionItem.assignees?.map((assignee) => (
                              <Avatar
                                key={assignee.id}
                                text={`${assignee.firstName} ${assignee.lastName}`}
                              />
                            ))}
                          </AvatarGroup>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{ marginLeft: "auto" }}
                            // disabled={true}
                            onClick={() => {
                              deleteActionItems(actionItem);
                            }}
                          >
                            DELETE
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                              updateActionItems(actionItem);
                            }}
                            sx={{ marginLeft: "auto" }}
                          >
                            Complete
                          </Button>
                        </CardActions>
                      </Card>
                    ))}
                  </Stack>
                ) : (
                  <Stack spacing={2}>
                    {currentUserActionItems?.map((actionItem) => (
                      <Card key={actionItem.id} sx={{ maxWidth: 450 }}>
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {actionItem.note}
                          </Typography>
                          <Chip
                            label={actionItem.status}
                            color="success"
                            size="small"
                          />

                          <Typography color="text.secondary" component="div">
                            {actionItem.createdAt.slice(0, 10)}
                          </Typography>
                          <AvatarGroup max={4}>
                            {actionItem.assignees?.map((assignee) => (
                              <Avatar
                                key={assignee.id}
                                text={`${assignee.firstName} ${assignee.lastName}`}
                              />
                            ))}
                          </AvatarGroup>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{ marginLeft: "auto" }}
                            // disabled={true}
                            onClick={() => {
                              deleteActionItems(actionItem);
                            }}
                          >
                            DELETE
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                              updateActionItems(actionItem);
                            }}
                            sx={{ marginLeft: "auto" }}
                          >
                            Complete
                          </Button>
                        </CardActions>
                      </Card>
                    ))}
                  </Stack>
                )}
              </Box>
            </Grid>
            {/* Charts */}
            <Grid item xs={8}>
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
                      <Typography>
                        {insight?.outstandingActionItemCount}
                      </Typography>
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
                      <Typography>
                        {insight?.completedActionItemCount}
                      </Typography>
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
                      Left Action Items
                      <Typography>
                        {insight?.outstandingActionItemCount &&
                          insight?.outstandingActionItemCount -
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
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};
