import React from "react";
import {
  AvatarGroup,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Drawer,
  Grid,
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
import { useActionItems } from "../../../../hooks/useActionItems";
import { useInsight } from "../../../../hooks/useInsight";
import { useParams } from "react-router-dom";
import { LoadingIndicator } from "../../../common/LoadingIndicator";

// Icon
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

// {****styleBadge*****}
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
// {****styleBadge*****}

export const TeamScreen = () => {
  const { teamId } = useParams<{ teamId: string }>();

  const { team, loading } = useTeam(teamId);
  // console.log(team);

  // const { actionItems, isLoading } = useActionItems(teamId);
  // console.log(actionItems);

  const { insight, insightLoading } = useInsight(teamId);
  console.log(insight);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Container maxWidth="xl" sx={{ marginTop: 2, display: "flex" }}>
      {/* Drawer Menu List start */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Template" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="Retro History" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Team Settings" />
            </ListItemButton>
          </List>
        </Box>

        <Divider />
      </Drawer>
      {/* Drawer Menu List end */}

      <Box component="main" sx={{ flexGrow: 1, marginLeft: 0 }}>
        {" "}
        <Toolbar />
        {/* Team Member list & New Retro Button */}
        <Grid
          container
          direction="row"
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            height: 108,
          }}
        >
          <Grid item xs={4} alignItems="flex-start">
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ marginBottom: 2 }}
            >
              {team?.name}
            </Typography>
            <AvatarGroup sx={{ width: 200 }}>
              {team?.teamMembers?.map((member) => (
                <Avatar
                  key={member.id}
                  text={`${member.firstName} ${member.lastName}`}
                />
              ))}
            </AvatarGroup>
          </Grid>
          <Grid item xs={8}>
            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              sx={{
                width: 8,
                marginRight: 2,
              }}
            ></Button>
            <Button variant="contained" startIcon={<AddIcon />}>
              New Retro
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: 2, marginBottom: 5 }} />
        <Grid
          container
          sx={{
            height: 500,
            // marginTop: 5,
            direction: "row",
            alignItems: "flex-start",
          }}
        >
          {/* Action Items */}
          <Grid item xs={4}>
            <Box
              component="div"
              sx={{
                bgcolor: "#F5F7F9",
                // width: 500,
                padding: 3,
                borderRadius: 2,
                justifyItems: "center",
              }}
            >
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{ marginBottom: 2 }}
              >
                Action Items
              </Typography>
              <Stack spacing={2}>
                <Card sx={{ maxWidth: 450 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Action Items One
                    </Typography>
                    <Typography variant="h5" component="div">
                      Fix HomePage Bug
                    </Typography>
                    <Typography variant="body2">
                      well meaning and kindly.well meaning and kindly.well
                      meaning and kindly.well meaning and kindly.well meaning
                      and kindly.well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  {/* <CardActions>
                    <AvatarGroup max={4} sx={{ marginRight: 15 }}>
                      {" "}
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 24, height: 24 }}
                      />
                      <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatar/2.jpg"
                        sx={{ width: 24, height: 24 }}
                      />
                    </AvatarGroup>
                    <Button size="small">Details</Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      disabled={true}
                    >
                      Delete
                    </Button>
                    <Button variant="contained" size="small">
                      Complete
                    </Button>
                  </CardActions> */}
                </Card>
                <Card>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Action Items One
                    </Typography>
                    <Typography variant="h5" component="div">
                      Fix HomePage Bug
                    </Typography>
                    <Typography variant="body2">
                      well meaning and kindly.well meaning and kindly.well
                      meaning and kindly.well meaning and kindly.well meaning
                      and kindly.well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  {/* <CardActions>
                    <AvatarGroup max={4} sx={{ width: 50, marginRight: 15 }}>
                      {" "}
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 24, height: 24 }}
                      />
                      <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatar/2.jpg"
                        sx={{ width: 24, height: 24 }}
                      />
                    </AvatarGroup>
                    <Button size="small">Details</Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      disabled={true}
                    >
                      Delete
                    </Button>
                    <Button variant="contained" size="small">
                      Complete
                    </Button>
                  </CardActions> */}
                </Card>
              </Stack>
            </Box>
          </Grid>
          {/* Charts */}
          <Grid item xs={8}>
            <Grid
              container
              component="div"
              sx={{
                bgcolor: "#F5F7F9",
                // width: 1000,
                padding: 3,
                borderRadius: 2,
                marginLeft: 5,
                // justifyItems: "center",
              }}
              spacing={2}
            >
              <Grid item xs={4}>
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
                </Paper>
              </Grid>
              <Grid item xs={4}>
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
                </Paper>
              </Grid>
              <Grid item xs={4}>
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
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  {" "}
                  Action Items Line Bar
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  Team Member Contribution (pie)
                </Paper>
              </Grid>
              <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
