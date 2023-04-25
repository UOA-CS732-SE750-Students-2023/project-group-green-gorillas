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

export function RetroScreen() {
  const { teamId } = useParams<{ teamId: string }>();

  const { team, loading } = useTeam(teamId);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          height: 80,
          background: "#f2f2f2",
          width: "100%",
          display: "flex",
          boxSizing: "border-box",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Box sx={{ marginright: 32 }}>
          <Typography
            sx={{ fontSize: 14, fontWeight: "bold", color: "#333333" }}
          >
            Participants
          </Typography>
          <List sx={{ display: "flex" }}>
            {team?.teamMembers?.map((member) => (
              <ListItem
                sx={{
                  marginLeft: -16,
                  height: 36,
                  width: 36,
                  border: "2px solid #f2f2f2",
                  boxSizing: "border-box",
                  borderRadius: "50%",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  cursor: "pointer",
                  transition: ".2s ease all",
                }}
                key={member.id}
              >
                <ListItemAvatar>
                  <Avatar text={`${member.firstName} ${member.lastName}`} />
                </ListItemAvatar>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
      {/* <Stage
        retro={retro}
        stage={retroStage}
        setStage={setRetroStage}
        actionItems={actionItems}
        setActionItems={setActionItems}
      /> */}
    </React.Fragment>
  );
}
