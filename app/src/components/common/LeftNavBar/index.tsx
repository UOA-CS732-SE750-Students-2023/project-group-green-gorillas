import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
} from '@mui/material';
import OrgIcon from '@mui/icons-material/Business';
import TeamIcon from '@mui/icons-material/Groups';
import UserIcon from '@mui/icons-material/ManageAccounts';
import { MainScreenPath } from '../../screens/Main';

const navigationLinks = [
    { label: 'Organization', path: '../../screens/OrgManagement', icon: OrgIcon },
    { label: 'Team', path: '../../screens/TeamManagement', icon: TeamIcon },
    { label: 'User', path: '../../screens/UserManagement', icon: UserIcon },
];

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

export const LeftNavBar = () => {
    const { pathname } = useLocation();

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {navigationLinks.map(({ label, path, icon: Icon }) => (
                            <ListItemButton
                                key={label}
                                component={Link}
                                to={path}
                                selected={pathname === path}
                            >
                                <ListItemIcon>
                                    <Icon />
                                </ListItemIcon>
                                <ListItemText primary={label} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
                <Divider />
            </Drawer>
        </Box>
    );
};
