import { Container, Divider } from "@mui/material";
import { useTeam } from "../../../../../hooks/useTeam";
import { useParams } from "react-router-dom";
import { RetroHistoryList } from "./RetroHistoryList";

export const RetroHistoryScreen = () => {
  const { teamId } = useParams<{ teamId: string }>();
  // const { user, isAdmin } = useCurrentUser();

  const { team } = useTeam(teamId);

  return (
    <Container sx={{ marginTop: 5 }}>
      <h1>Retrospective History-{team?.name}</h1>
      <Divider sx={{ marginY: 2 }} />
      <RetroHistoryList selectedTeam={team?.id} />
    </Container>
  );
};
