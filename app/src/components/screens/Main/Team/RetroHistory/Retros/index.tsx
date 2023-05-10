import { Box, Container, Divider } from "@mui/material";
import { useTeam } from "../../../../../../hooks/useTeam";
import { useParams } from "react-router-dom";
import { RetroHistoryList } from "./RetroHistoryList";
import { RetroHistorySkeleton } from "./RetroHistorySkeleton";

export const RetrosScreen = () => {
  const { teamId } = useParams<{ teamId: string }>();

  const { team, loading } = useTeam(teamId);

  return (
    <>
      {loading ? (
        <Box sx={{ flexGrow: 1, marginTop: 5, width: "100%" }}>
          <RetroHistorySkeleton />
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, marginTop: 5, width: "100%" }}>
          <h1>Retrospective History-{team?.name}</h1>
          <Divider sx={{ marginY: 2 }} />
          <RetroHistoryList selectedTeam={team?.id} />
        </Box>
      )}
    </>
  );
};
