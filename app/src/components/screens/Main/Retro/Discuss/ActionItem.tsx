import React, { useEffect, useMemo, useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Box } from "@mui/system";
import stageStyles from "../styles/stage.module.css";
import { request } from "../../../../../api/request";
import {
  DELETE_ACTION_ITEM,
  UPDATE_ACTION_ITEM_NOTE,
} from "../../../../../api/api";
import { debounce } from "../../../../../utils/debounce";

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
  }, [action]);

  const updateActionItemNote = async (note: string) => {
    await request.patch(UPDATE_ACTION_ITEM_NOTE, {
      note,
      actionItemId: action.id,
    });
  };

  const onActionItemChange = (e: any) => {
    e.preventDefault();

    const value = e.target.value;

    setActionItem(value);

    actionItemUpdateDebounce(() => updateActionItemNote(value));
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
        <div style={{ cursor: "pointer" }}>Assign to...</div>
        <Box
          onClick={deleteActionItem}
          sx={{ color: "red" }}
          className={stageStyles.mark}
        >
          Delete
        </Box>
      </Box>
    </Box>
  );
}

export default ActionItem;
