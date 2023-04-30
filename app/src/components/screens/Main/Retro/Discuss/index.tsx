import React from "react";
import { useState } from "react";
import DiscussGroup from "./DiscussGroup";
import DiscussNote from "./DiscussNote";
import lastItem from "../../../../../assets/lastItem.svg";
import nextItem from "../../../../../assets/nextItem.svg";
import Button from "../Button";
import ActionItem from "./ActionItem";
import stageStyles from "../styles/stage.module.css";
import styles from "../styles/styles.module.css";
import { Box } from "@mui/system";

function Discuss({ retro, items, actionItems, setActionItems }: any) {
  const [index, setIndex] = useState(0);
  const [newestItem, setNewestItem] = useState(0);

  function addActionItem() {
    const newActionItems = [...actionItems];
    newActionItems.push({
      value: "",
    });
    setNewestItem(newActionItems.length - 1);
    setActionItems(newActionItems);
  }

  function updateActionItem(i, e) {
    let newActionItems = [...actionItems];
    newActionItems[i].value = e.target.value;
    setActionItems(newActionItems);
  }

  return (
    <Box className={stageStyles.discuss__container}>
      <Box className={stageStyles.discuss__wrapper}>
        <Box className={stageStyles.discussion__item}>
          <Box className={styles.heading}>
            {retro.colShortDesc} {items[index].column}
          </Box>
          {items[index].id.includes("group") ? (
            <DiscussGroup group={items[index]} />
          ) : (
            <DiscussNote note={items[index]} />
          )}
        </Box>
        <Box className={stageStyles.discussion__buttons}>
          <Box
            className={stageStyles.vote__button}
            onClick={() => index !== items.length - 1 && setIndex(index + 1)}
          >
            <Box
              component="img"
              src={nextItem}
              alt=""
              className={stageStyles.vote__button__img}
            />
          </Box>
          <Box
            className={stageStyles.vote__button}
            onClick={() => index !== 0 && setIndex(index - 1)}
          >
            <Box
              component="img"
              src={lastItem}
              alt=""
              className={stageStyles.vote__button__img}
            />
          </Box>
        </Box>
      </Box>
      <Box className={stageStyles.actions__wrapper}>
        <Box className={styles.heading}>Action plan</Box>
        <Box className={styles.flex__right} style={{ marginTop: "8px" }}>
          <Button
            text="New action item"
            color="outline"
            clickFn={addActionItem}
          />
        </Box>
        <Box className={stageStyles.action__items}>
          {actionItems.map((item, i) => (
            <ActionItem
              action={item}
              i={i}
              updateItem={updateActionItem}
              newestItem={newestItem}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Discuss;
