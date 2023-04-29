import React from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Box } from "@mui/system";
import stageStyles from "../styles/stage.module.css";

function ActionItem({ action, i, updateItem, newestItem }: any) {
  return (
    <Box className={stageStyles.action__item}>
      <TextareaAutosize
        placeholder="New action item..."
        className={stageStyles.note__textarea}
        value={action.value}
        onChange={(e) => updateItem(i, e)}
        autoFocus={i === newestItem}
      />
      <Box className={stageStyles.action__functions}>
        <div style={{ cursor: "pointer" }}>Assign to...</div>
        <Box className={stageStyles.mark}>Mark as complete</Box>
      </Box>
    </Box>
  );
}

export default ActionItem;
