import { Box, Container } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import stageStyles from "../styles/stage.module.css";
import ThinkColumn from "./ThinkColumn";
import addIcon from "../../../../../assets/add.svg";
import { request } from "../../../../../api/request";
import { ADD_SECTION } from "../../../../../api/api";

type Props = {
  retro: any;
};

const Think = ({ retro }: Props) => {
  const thinkContainerRef: any = useRef();
  const [boardSections, setBoardSections] = useState([]);

  useEffect(() => {
    setBoardSections(retro.boardSections);
  }, [retro.boardSections]);

  const [focusedNoteRef, setFocusedNoteRef] = useState<any>(null);

  useEffect(() => {
    window.addEventListener("wheel", () => {
      setFocusedNoteRef(null);
    });

    return () => {
      window.removeEventListener("wheel", () => {});
    };
  }, []);

  useEffect(() => {
    if (focusedNoteRef?.current) {
      thinkContainerRef?.current.scrollTo({
        top: focusedNoteRef?.current?.offsetTop
          ? focusedNoteRef?.current?.offsetTop - 200
          : 0,
        behavior: "smooth",
      });
    }
  }, [retro, focusedNoteRef]);

  const createColumn = async () => {
    await request.post(ADD_SECTION, {
      boardId: retro.id,
      teamId: retro.teamId,
      order: retro.boardSections.length + 1,
    });
  };

  return (
    <Container
      ref={thinkContainerRef}
      className={stageStyles.columns__wrapper}
      disableGutters
      // @ts-ignore
      maxWidth="false"
    >
      {boardSections
        .sort((a: any, b: any) => a.order - b.order)
        .map((boardSection: any) => (
          <ThinkColumn
            setFocusedNoteRef={setFocusedNoteRef}
            focusedNoteRef={focusedNoteRef}
            key={boardSection.id}
            boardSection={boardSection}
          />
        ))}
      <Box
        className={stageStyles.add__column__button}
        onClick={() => createColumn()}
      >
        Add Column
        <img src={addIcon} alt="" className={stageStyles.add__button__img} />
      </Box>
    </Container>
  );
};

export default Think;
