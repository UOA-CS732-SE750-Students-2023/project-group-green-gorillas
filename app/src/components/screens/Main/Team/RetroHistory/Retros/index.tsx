import { Box, Container, Divider } from "@mui/material";
import { useTeam } from "../../../../../../hooks/useTeam";
import { useParams } from "react-router-dom";
import { RetroHistoryList } from "./RetroHistoryList";
import { RetroHistorySkeleton } from "./RetroHistorySkeleton";

export const RetrosScreen = () => {
  const { teamId } = useParams<{ teamId: string }>();

  const { team, loading } = useTeam(teamId);

  return (
    <Container sx={{ marginTop: 5 }}>
      {loading ? (
        <RetroHistorySkeleton />
      ) : (
        <Box>
          <h1>Retrospective History-{team?.name}</h1>
          <Divider sx={{ marginY: 2 }} />
          <RetroHistoryList selectedTeam={team?.id} />
        </Box>
      )}
    </Container>
  );
};
