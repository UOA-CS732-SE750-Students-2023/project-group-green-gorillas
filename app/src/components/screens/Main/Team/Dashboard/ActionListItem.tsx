import {
  AvatarGroup,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Avatar } from "../../../../common/Avatar";
import { ActionItem, ActionItemStatus } from "../../../../../types/actionItems";
import { TeamRole } from "../../../../../types/teamRole";
import { useHistory } from "react-router-dom";
import { RetroStage } from "../../Retro/Stage";
import { MainScreenPath } from "../../index";

type Props = {
  actionItem: ActionItem;
  teamId: string | null;
  teamRole: TeamRole | null;
  updateActionItems: any;
  deleteActionItems: any;
  showSprintLabel?: boolean;
};

export const ActionListItem = ({
  actionItem,
  teamId,
  teamRole,
  updateActionItems,
  deleteActionItems,
  showSprintLabel = true,
}: Props) => {
  const history = useHistory();

  const onNavigateToRetroHistory = (retro: any): void => {
    if (!retro) return;

    if (retro.stage !== RetroStage.FINALIZE) {
      history.replace(
        `${MainScreenPath.Retro}/${retro.id}/team/${retro.teamId}`
      );
      return;
    }

    history.replace(
      `${MainScreenPath.TEAM}/${retro.teamId}/retro-history/${retro.id}`
    );
  };

  return (
    <Card key={actionItem.id} sx={{ maxWidth: 450, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {actionItem.note}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label={actionItem.status} color="success" size="small" />
          {showSprintLabel && (
            <Chip
              label={actionItem?.retro?.name}
              size="small"
              onClick={() => onNavigateToRetroHistory(actionItem.retro)}
            />
          )}
        </Stack>
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
            onClick={deleteActionItems}
          >
            DELETE
          </Button>
        ) : null}

        <Button
          variant="contained"
          size="small"
          onClick={updateActionItems}
          sx={{ marginLeft: "auto" }}
        >
          {actionItem.status === ActionItemStatus.IN_PROGRESS
            ? "Complete"
            : "Un-complete"}
        </Button>
      </CardActions>
    </Card>
  );
};
