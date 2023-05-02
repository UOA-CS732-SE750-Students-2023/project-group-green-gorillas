import React, { useMemo } from "react";
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
import { useAggregateRetro } from "../utils/use-aggregate-retro";
import { request } from "../../../../../api/request";
import { ADD_ACTION_ITEM } from "../../../../../api/api";

function Discuss({ retro }: any) {
  const aggregateRetro = useAggregateRetro(retro);

  const notes = useMemo(() => {
    const notes: any[] = [];

    aggregateRetro.boardSections.forEach((boardSection: any) => {
      boardSection.boardNotes.forEach((boardNote: any) => {
        notes.push({
          ...boardNote,
          sectionName: boardSection.name,
        });
      });

      boardSection.groups.forEach((group: any) => {
        if (group.items) {
          notes.push({
            ...group,
            sectionName: boardSection.name,
          });
        }
      });
    });

    return notes.sort(
      (a: any, b: any) => b.boardNoteVotes.length - a.boardNoteVotes.length
    );
  }, [aggregateRetro]);

  const onAddActionItem = async () => {
    await request.post(ADD_ACTION_ITEM, {
      teamId: retro.teamId,
      retroId: retro.id,
    });
  };

  const [index, setIndex] = useState(0);

  return (
    <Box className={stageStyles.discuss__container}>
      <Box className={stageStyles.discuss__wrapper}>
        <Box className={stageStyles.discussion__item}>
          <Box className={styles.heading}>{notes[index].sectionName}</Box>
          {notes[index]?.items ? (
            <DiscussGroup group={notes[index]} />
          ) : (
            <DiscussNote note={notes[index]} />
          )}
          (Vote: {notes[index].boardNoteVotes.length})
        </Box>
        <Box className={stageStyles.discussion__buttons}>
          <Box
            className={stageStyles.vote__button}
            onClick={() => index !== notes.length - 1 && setIndex(index + 1)}
          >
            <Box
              component="img"
              src={nextItem}
              alt=""
              className={stageStyles.vote__button__img}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 0.5,
            }}
          >
            <Box>
              {index + 1} / {notes.length}
            </Box>
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
}

export default Discuss;
