import {
  Box,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemAvatar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "../../../common/Avatar";
import { LoadingIndicator } from "../../../common/LoadingIndicator";
import retroStyles from "./styles/retro.module.css";
import Stage from "./Stage";
import { useRetro } from "../../../../hooks/useRetro";

export const RetroScreen = () => {
  const { teamId, retroId } = useParams<{ teamId: string; retroId: string }>();
  const { isLoading, retroUsers, retro } = useRetro(retroId, teamId);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        // @ts-ignore
        maxWidth="false"
        disableGutters
        className={retroStyles.retro__header}
      >
        <Box className={retroStyles.header__section}>
          <Typography className={retroStyles.header__title}>
            Participants
          </Typography>
          <List className={retroStyles.participants__list}>
            {retroUsers?.map((user) => (
              <ListItem className={retroStyles.participant} key={user.id}>
                <Tooltip
                  title={`${user.displayName} (${user.firstName} ${user.lastName}) (${user.email})`}
                >
                  <ListItemAvatar>
                    <Avatar text={`${user.firstName} ${user.lastName}`} />
                  </ListItemAvatar>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
      <Stage retro={retro} />
    </React.Fragment>
  );
};
