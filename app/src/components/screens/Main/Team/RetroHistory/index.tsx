import {
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TeamDrawer } from "../../../../common/TeamDrawer";
import { useTeam } from "../../../../../hooks/useTeam";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../../../../hooks/useCurrentUser";
import { TeamFilter } from "./TeamFilter";
import { RetroHistoryList } from "./RetroHistoryList";

export const RetroHistoryScreen = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { user, isAdmin } = useCurrentUser();

  const { team } = useTeam(teamId);

  return (
    <Container sx={{ marginTop: 5 }}>
      <h1>Retrospective History</h1>
      <Divider sx={{ marginY: 2 }} />

      <RetroHistoryList selectedTeam={team?.id} />
    </Container>
  );
};
