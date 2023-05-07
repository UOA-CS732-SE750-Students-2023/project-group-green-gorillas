import stageStyles from "../styles/stage.module.css";
import { Box } from "@mui/material";
import styles from "../styles/styles.module.css";
import Button from "../Button";
import ActionItem from "../Discuss/ActionItem";
import React from "react";
import { request } from "../../../../../api/request";
import { ADD_ACTION_ITEM } from "../../../../../api/api";
import { TimeInvest } from "./TimeInvest";

export const Review = ({ retro }: any) => {
  const onAddActionItem = async () => {
    await request.post(ADD_ACTION_ITEM, {
      teamId: retro.teamId,
      retroId: retro.id,
    });
  };

  return (
    <Box className={stageStyles.discuss__container}>
      <Box className={stageStyles.discuss__wrapper}>
        <TimeInvest retro={retro} />
      </Box>
      <Box className={stageStyles.actions__wrapper}>
        <Box className={styles.heading}>Action plan</Box>
        <Box className={styles.flex__right} style={{ marginTop: "8px" }}>
          <Button
            text="New action item"
            color="outline"
            clickFn={onAddActionItem}
          />
        </Box>
        <Box className={stageStyles.action__items}>
          {retro.actionItems
            .sort((a: any, b: any) => (a.createdAt < b.createdAt ? 1 : -1))
            .map((item: any) => (
              <ActionItem key={item.id} action={item} />
            ))}
        </Box>
      </Box>
    </Box>
  );
};
