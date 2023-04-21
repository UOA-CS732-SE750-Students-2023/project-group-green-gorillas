import {
  AppBar,
  Badge,
  Box,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Avatar } from "../Avatar";
import { useSignOut } from "../../../hooks/useSignOut";

export const TopNavBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { user } = useCurrentUser();

  const { onSignOut } = useSignOut();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <Typography
            sx={{ flexGrow: 1 }}
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
          >
            Retrospective Monster
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={"Open settings"}>
              <IconButton
                size={"small"}
                onClick={handleOpenUserMenu}
                color="inherit"
              >
                <Avatar text={user?.displayName ?? ""} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => {}}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={onSignOut}>
                <Typography textAlign="center">Sign Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
