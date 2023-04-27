import {
  Box,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTeam } from "../../../hooks/useTeam";
import { Avatar } from "../../common/Avatar";
import { LoadingIndicator } from "../../common/LoadingIndicator";
import retroStyles from "./styles/retro.module.css";
import Stage from "./Stage";

export function RetroScreen() {
  const { teamId } = useParams<{ teamId: string }>();

  const { team, loading } = useTeam(teamId);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className={retroStyles.retro__header}>
        <Box className={retroStyles.header__section}>
          <Typography className={retroStyles.header__title}>
            Participants
          </Typography>
          <List className={retroStyles.participants__list}>
            {team?.teamMembers?.map((member) => (
              <ListItem className={retroStyles.participant} key={member.id}>
                <ListItemAvatar>
                  <Avatar text={`${member.firstName} ${member.lastName}`} />
                </ListItemAvatar>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
      <Stage />
    </React.Fragment>
  );
}
