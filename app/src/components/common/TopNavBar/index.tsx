import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import { useMemo, useState, MouseEvent } from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Avatar } from "../Avatar";
import { useSignOut } from "../../../hooks/useSignOut";
import { Link } from "react-router-dom";
import { MainScreenPath } from "../../screens/Main";
import { useHistory } from "react-router-dom";

export const TopNavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { user, isAdmin } = useCurrentUser();

  const userFullName = useMemo(() => {
    if (!user) return "";

    return `${user.firstName} ${user.lastName}`;
  }, [user]);

  const { onSignOut } = useSignOut();

  const { location, push } = useHistory();

  const shouldShowMenu = useMemo(() => {
    return location.pathname.startsWith(MainScreenPath.TEAM);
  }, [location]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position={shouldShowMenu ? "fixed" : "static"}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography
            sx={{ flexGrow: 1 }}
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            style={{ cursor: "pointer" }}
            onClick={() => (window.location.href = MainScreenPath.HOME)}
          >
            Retrospective Monster
          </Typography>

          <Typography
            sx={{ flexGrow: 1 }}
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
          >
            {user!.organisation!.name}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            {isAdmin && (
              <Tooltip title={"Open Admin Settings"}>
                <IconButton
                  onClick={() => push(MainScreenPath.ADMIN)}
                  color={"default"}
                >
                  <Settings />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title={"Open settings"}>
              <IconButton
                size={"small"}
                onClick={handleOpenUserMenu}
                color="inherit"
              >
                <Avatar text={userFullName} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link to={MainScreenPath.Profile}>
                <Typography textAlign="center">Profile</Typography>
              </Link>
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
