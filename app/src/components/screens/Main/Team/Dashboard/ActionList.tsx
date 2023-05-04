import {
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useActionItems } from "../../../../../hooks/useActionItems";
import { useState } from "react";
import { User } from "../../../../../types/user";
import { ActionListItem } from "./ActionListItem";
import { TeamRole } from "../../../../../types/teamRole";

type Props = {
  teamId: string | null;
  user: User | null;
  teamRole: TeamRole | null;
};

export const ActionList = ({ teamId, user, teamRole }: Props) => {
  const { isLoading, actionItems } = useActionItems(teamId || "");

  const currentUserActionItems = actionItems?.filter((item) =>
    item.assignees.some((assignee) => assignee.id === user?.id)
  );

  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <Box
      component="div"
      sx={{
        bgcolor: "#F5F7F9",
        padding: 3,
        borderRadius: 2,
        justifyItems: "center",
      }}
    >
      <FormControlLabel
        value="start"
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            color="primary"
          />
        }
        label="Show My Actions"
        labelPlacement="start"
        sx={{ marginLeft: 0 }}
      />
      {checked ? (
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            noWrap
            sx={{ marginBottom: 2 }}
          >
            My Action Items
          </Typography>
          {currentUserActionItems?.map((actionItem) => (
            <ActionListItem
              key={actionItem.id}
              actionItem={actionItem}
              teamId={teamId}
              teamRole={teamRole}
            />
          ))}
        </Box>
      ) : (
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            noWrap
            sx={{ marginBottom: 2 }}
          >
            Team Action Items
          </Typography>
          {actionItems?.map((actionItem) => (
            <ActionListItem
              key={actionItem.id}
              actionItem={actionItem}
              teamId={teamId}
              teamRole={teamRole}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
