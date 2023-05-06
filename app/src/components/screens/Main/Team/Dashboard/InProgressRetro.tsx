import { useParams } from "react-router";
import { useInProgressRetro } from "../../../../../hooks/useInProgressRetro";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { MainScreenPath } from "../../index";

export const InProgressRetro = () => {
  const { teamId } = useParams<{ teamId: string }>();

  const { inProgressRetro } = useInProgressRetro(teamId);

  const history = useHistory();

  const onNavigateToInProgressRetro = () => {
    if (!inProgressRetro) return;
    history.replace(
      `${MainScreenPath.Retro}/${inProgressRetro.id}/team/${inProgressRetro.teamId}`
    );
  };

  if (!inProgressRetro) {
    return null;
  }

  return (
    <Box
      onClick={onNavigateToInProgressRetro}
      component="div"
      sx={{
        cursor: "pointer",
        bgcolor: "#F5F7F9",
        padding: 3,
        borderRadius: 2,
        justifyItems: "center",
        marginBottom: 2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        noWrap
        component="div"
        justifyContent="flex-end"
        sx={{ marginBottom: 2 }}
      >
        {" "}
        Active Retrospective
      </Typography>
      <Card sx={{ maxWidth: 350 }}>
        <CardContent>
          <Typography variant="h6">Name:{inProgressRetro?.name}</Typography>
          <Typography>Stage: {inProgressRetro?.stage}</Typography>
          <Typography>
            Created By:{inProgressRetro?.createdByUser?.displayName}
          </Typography>
          <Typography color="text.secondary">
            Created At:{inProgressRetro?.createdAt?.slice(0, 10)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
