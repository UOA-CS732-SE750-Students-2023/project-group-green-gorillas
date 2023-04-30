import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import { useHistory } from "react-router-dom";
import { MainScreenPath } from "../screens/Main";

type Props = {
  teamId: string;
};

export const TeamDrawer: React.FC<Props> = ({ teamId }) => {
  const history = useHistory();

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
            onClick={() => history.push(`${MainScreenPath.TEAM}/${teamId}`)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton
            onClick={() => history.push(`${MainScreenPath.Template}/${teamId}`)}
          >
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
  );
};
