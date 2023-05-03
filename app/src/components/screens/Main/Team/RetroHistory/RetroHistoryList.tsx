import {
  AvatarGroup,
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useRetroHistory } from "../../../../../hooks/useRetroHistory";
import { Avatar } from "../../../../common/Avatar";

type RetroHistoryListProps = {
  selectedTeam: string | undefined;
};

export const RetroHistoryList = ({ selectedTeam }: RetroHistoryListProps) => {
  const { retroList, getRetroList } = useRetroHistory(selectedTeam || "");

  return (
    <Box>
      {retroList?.map((retro) => (
        <Card key={retro.id}>
          <CardContent>
            <Typography variant="h6" component="div">
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
