import React, { useEffect, useMemo, useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Box } from "@mui/system";
import stageStyles from "../styles/stage.module.css";
import { request } from "../../../../../api/request";
import {
  ASSIGN_USER_TO_ACTION_ITEM,
  DELETE_ACTION_ITEM,
  UNASSIGN_USER_TO_ACTION_ITEM,
  UPDATE_ACTION_ITEM_NOTE,
} from "../../../../../api/api";
import { debounce } from "../../../../../utils/debounce";
import { AvatarGroup, Menu, MenuItem, Typography } from "@mui/material";
import { Avatar } from "../../../../common/Avatar";
import { useTeam } from "../../../../../hooks/useTeam";

function ActionItem({ action }: any) {
  const deleteActionItem = async () => {
    await request.delete(DELETE_ACTION_ITEM(action.id));
  };

  const [actionItem, setActionItem] = useState("");

  const actionItemUpdateDebounce = useMemo(() => {
    return debounce(500);
  }, []);

  useEffect(() => {
    setActionItem(action.note);
  }, [action.note]);

  const updateActionItemNote = async (note: string) => {
    await request.patch(UPDATE_ACTION_ITEM_NOTE, {
      note,
      actionItemId: action.id,
    });
  };

  const { team } = useTeam(action.teamId);

  const onActionItemChange = (e: any) => {
    e.preventDefault();

    const value = e.target.value;

    setActionItem(value);

    actionItemUpdateDebounce(() => updateActionItemNote(value));
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const assignOrUnAssignUserToActionItem = (member: any) => {
    if (action.assignees.find((assignee: any) => assignee.id === member.id)) {
      return request.request({
        method: "DELETE",
        url: UNASSIGN_USER_TO_ACTION_ITEM,
        data: {
          actionItemId: action.id,
          userId: member.id,
        },
      });
    }

    return request.post(ASSIGN_USER_TO_ACTION_ITEM, {
      actionItemId: action.id,
      userId: member.id,
    });
  };

  return (
    <Box className={stageStyles.action__item}>
      <TextareaAutosize
        placeholder="New action item..."
        className={stageStyles.note__textarea}
        value={actionItem}
        onChange={onActionItemChange}
        autoFocus={true}
      />
      <Box className={stageStyles.action__functions}>
        <div
          onClick={(e: any) => setAnchorElUser(e.currentTarget)}
          style={{ cursor: "pointer" }}
        >
          Assign to...
        </div>
        <Menu
          sx={{ mt: "20px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {team?.teamMembers?.map((member) => {
            return (
              <MenuItem
                key={member.id}
                selected={
                  !!action.assignees.find(
                    (assignee: any) => assignee.id === member.id
                  )
                }
                onClick={() => assignOrUnAssignUserToActionItem(member)}
              >
                <Avatar text={`${member.firstName} ${member.lastName}`} />
                <Typography ml={1} textAlign="center">
                  {member.firstName} {member.lastName}
                </Typography>
              </MenuItem>
            );
          })}
        </Menu>

        <Box
          onClick={deleteActionItem}
          sx={{ color: "red" }}
          className={stageStyles.mark}
        >
          Delete
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <AvatarGroup max={4}>
          {action.assignees?.map((assignee: any) => (
            <Avatar
              key={assignee.id}
              text={`${assignee.firstName} ${assignee.lastName}`}
            />
          ))}
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default ActionItem;
