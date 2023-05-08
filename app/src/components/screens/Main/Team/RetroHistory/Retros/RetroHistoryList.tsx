import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useRetroHistory } from "../../../../../../hooks/useRetroHistory";
import { Avatar } from "../../../../../common/Avatar";
import { MainScreenPath } from "../../../index";
import { useHistory } from "react-router-dom";

type Props = {
  selectedTeam: string | undefined;
};

export const RetroHistoryList = ({ selectedTeam }: Props) => {
  const { retroList } = useRetroHistory(selectedTeam || "");
  const history = useHistory();

  const navigateToRetroHistoryOverview = (retro: any) => {
    history.replace(
      `${MainScreenPath.TEAM}/${retro.teamId}/retro-history/${retro.id}`
    );
  };

  return (
    <Grid container spacing={2}>
      {retroList?.map((retro) => (
        <Grid item xs={3}>
        <Card
          onClick={() => navigateToRetroHistoryOverview(retro)}
          key={retro.id}
          sx={{ cursor: "pointer" }}
        >
          <CardContent>
            <Typography variant="h5" noWrap sx={{ marginBottom: 2 }}>
              {retro.name}
            </Typography>
            <Typography color="text.secondary" component="div">
              {retro.createdAt.slice(0, 10)}
            </Typography>
          </CardContent>
        </Card>
        </Grid>
      ))}
    </Grid>
  );
};
