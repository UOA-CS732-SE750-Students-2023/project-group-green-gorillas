import { Box, Card, CardContent, Typography } from "@mui/material";
import { useRetroHistory } from "../../../../../hooks/useRetroHistory";
import { Avatar } from "../../../../common/Avatar";

type RetroHistoryListProps = {
  selectedTeam: string | undefined;
};

export const RetroHistoryList = ({ selectedTeam }: RetroHistoryListProps) => {
  const { retroList } = useRetroHistory(selectedTeam || "");

  return (
    <Box>
      {retroList?.map((retro) => (
        <Card key={retro.id} sx={{ maxWidth: 250 }}>
          <CardContent>
            <Typography variant="h5" noWrap sx={{ marginBottom: 2 }}>
              {retro.name}
            </Typography>
            <Typography color="text.secondary" component="div">
              {retro.createdAt.slice(0, 10)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
