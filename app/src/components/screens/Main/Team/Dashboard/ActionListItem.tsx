import {
  AvatarGroup,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { Avatar } from "../../../../common/Avatar";
import { useActionItems } from "../../../../../hooks/useActionItems";
import { ActionItem } from "../../../../../types/actionItems";
import { TeamRole } from "../../../../../types/teamRole";

type Props = {
  actionItem: ActionItem;
  teamId: string | null;
  teamRole: TeamRole | null;
};

export const ActionListItem = ({ actionItem, teamId, teamRole }: Props) => {
  const { updateActionItems, deleteActionItems } = useActionItems(teamId || "");

  return (
    <Card key={actionItem.id} sx={{ maxWidth: 450, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {actionItem.note}
        </Typography>
        <Chip label={actionItem.status} color="success" size="small" />

        <Typography color="text.secondary" component="div">
          {actionItem.createdAt.slice(0, 10)}
        </Typography>
        <AvatarGroup max={4}>
          {actionItem.assignees?.map((assignee) => (
            <Avatar
              key={assignee.id}
              text={`${assignee.firstName} ${assignee.lastName}`}
            />
          ))}
        </AvatarGroup>
      </CardContent>
      <CardActions>
        {teamRole?.role !== "MEMBER" ? (
          <Button
            variant="outlined"
            color="error"
            size="small"
            sx={{ marginLeft: "auto" }}
            // disabled={true}
            onClick={() => {
              deleteActionItems(actionItem);
            }}
          >
            DELETE
          </Button>
        ) : null}

        <Button
          variant="contained"
          size="small"
          onClick={() => {
            updateActionItems(actionItem);
          }}
          sx={{ marginLeft: "auto" }}
        >
          Complete
        </Button>
      </CardActions>
    </Card>
  );
};
