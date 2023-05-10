import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { useActionItems } from "../../../../../hooks/useActionItems";
import { useEffect, useState } from "react";
import { User } from "../../../../../types/user";
import { ActionListItem } from "./ActionListItem";
import { TeamRole } from "../../../../../types/teamRole";
import { ActionItem } from "../../../../../types/actionItems";

type Props = {
  teamId: string | null;
  user: User | null;
  teamRole: TeamRole | null;
  isSingleRetro?: boolean;
};

export const ActionList = ({
  teamId,
  user,
  teamRole,
  isSingleRetro,
}: Props) => {
  const { actionItems, updateActionItems, deleteActionItems } = useActionItems(
    teamId || ""
  );

  const [newActionItems, setNewActionItems] = useState<ActionItem[] | null>();

  useEffect(() => {
    setNewActionItems(actionItems);
  }, [actionItems]);

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
      {!isSingleRetro && (
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
      )}
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
              updateActionItems={() => updateActionItems(actionItem)}
              deleteActionItems={() => deleteActionItems(actionItem)}
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
          {newActionItems?.map((actionItem) => (
            <ActionListItem
              key={actionItem.id}
              actionItem={actionItem}
              teamId={teamId}
              teamRole={teamRole}
              updateActionItems={() => updateActionItems(actionItem)}
              deleteActionItems={() => deleteActionItems(actionItem)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
