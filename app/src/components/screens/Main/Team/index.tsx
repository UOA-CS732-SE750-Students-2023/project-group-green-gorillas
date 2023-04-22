import React from "react";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Avatar } from "../../../common/Avatar";
import { useTeam } from "../../../../hooks/useTeam";
import { useParams } from "react-router-dom";
import { LoadingIndicator } from "../../../common/LoadingIndicator";

export const TeamScreen = () => {
  const { teamId } = useParams<{ teamId: string }>();

  const { team, loading } = useTeam(teamId);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Container maxWidth="xl" sx={{ marginTop: 2 }}>
      <Typography
        sx={{ flexGrow: 1 }}
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
      >
        {team?.name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          Team Member
          <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#D3D3D3" }}>
            {team?.teamMembers?.map((member) => (
              <ListItem key={member.id} sx={{ marginBottom: 1 }}>
                <ListItemAvatar>
                  <Avatar text={`${member.firstName} ${member.lastName}`} />
                </ListItemAvatar>
                <ListItemText primary={member.displayName} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={10}>
          Content
        </Grid>
      </Grid>
    </Container>
  );
};
