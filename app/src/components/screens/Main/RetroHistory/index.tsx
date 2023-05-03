import {
  Box,
  Container,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TeamDrawer } from "../../../common/TeamDrawer";
import { useTeam } from "../../../../hooks/useTeam";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { TeamFilter } from "./TeamFilter";
import { RetroHistoryList } from "./RetroHistoryList";

export const RetroHistoryScreen = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { user, isAdmin } = useCurrentUser();
  // console.log(user);

  const defaultTeam = user?.teams[0];
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(
    defaultTeam?.id
  );
  const { team, loading } = useTeam(selectedTeam || "");
  // console.log(team);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTeam(event.target.value);
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: 2, display: "flex" }}>
      <TeamDrawer teamId={teamId} />
      <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          noWrap
          component="div"
          sx={{ marginBottom: 2 }}
        >
          Retrospective History
        </Typography>
        <TeamFilter
          selectedTeam={selectedTeam}
          handleChange={handleChange}
          user={user}
        />
        <Divider sx={{ marginY: 2 }}></Divider>

        <RetroHistoryList selectedTeam={selectedTeam} />
      </Box>
    </Container>
  );
};
