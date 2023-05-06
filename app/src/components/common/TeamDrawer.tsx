import {
  Box,
  Divider,
  Drawer,
  FormControl,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { MainScreenPath } from "../screens/Main";
import { useCurrentUser } from "../../hooks/useCurrentUser";

type Props = {
  teamId: string;
};

export const TeamDrawer: React.FC<Props> = ({ teamId }) => {
  const history = useHistory();

  const { user } = useCurrentUser();

  const onSwitchTeam = (e: any) => {
    const teamId = e.target.value;

    const pathname = history.location.pathname;

    if (pathname.endsWith("/template")) {
      history.replace(`${MainScreenPath.TEAM}/${teamId}/template`);
      return;
    }

    if (pathname.includes("/retro-history")) {
      history.replace(`${MainScreenPath.TEAM}/${teamId}/retro-history`);
      return;
    }

    history.replace(`${MainScreenPath.TEAM}/${teamId}/dashboard`);
  };

  return (
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
          <ListItemButton
            selected={history.location.pathname.endsWith("/dashboard")}
            onClick={() =>
              history.push(`${MainScreenPath.TEAM}/${teamId}/dashboard`)
            }
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton
            selected={history.location.pathname.endsWith("/template")}
            onClick={() =>
              history.push(`${MainScreenPath.TEAM}/${teamId}/template`)
            }
          >
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Template" />
          </ListItemButton>
          <ListItemButton
            selected={history.location.pathname.includes("/retro-history")}
            onClick={() =>
              history.push(`${MainScreenPath.TEAM}/${teamId}/retro-history`)
            }
          >
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Retro History" />
          </ListItemButton>
          {/*<ListItemButton>*/}
          {/*  <ListItemIcon>*/}
          {/*    <SettingsIcon />*/}
          {/*  </ListItemIcon>*/}
          {/*  <ListItemText primary="Team Settings" />*/}
          {/*</ListItemButton>*/}
        </List>
      </Box>
      <div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <Select value={teamId} onChange={onSwitchTeam} autoWidth>
            {user?.teams.map((team) => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Divider />
    </Drawer>
  );
};
