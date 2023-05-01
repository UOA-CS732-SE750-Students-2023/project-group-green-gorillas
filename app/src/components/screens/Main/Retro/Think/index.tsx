import { Container } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import stageStyles from "../styles/stage.module.css";
import ThinkColumn from "./ThinkColumn";

type Props = {
  retro: any;
};

const Think = ({ retro }: Props) => {
  const thinkContainerRef: any = useRef();

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
      console.log(focusedNoteRef?.current?.offsetTop);
      thinkContainerRef?.current.scrollTo({
        top: focusedNoteRef?.current?.offsetTop
          ? focusedNoteRef?.current?.offsetTop - 200
          : 0,
        behavior: "smooth",
      });
    }
  }, [retro, focusedNoteRef]);

  return (
    <Container
      ref={thinkContainerRef}
      className={stageStyles.columns__wrapper}
      disableGutters
      // @ts-ignore
      maxWidth="false"
    >
      {retro.boardSections
        .sort((a: any, b: any) => a.order - b.order)
        .map((boardSection: any) => (
          <ThinkColumn
            setFocusedNoteRef={setFocusedNoteRef}
            focusedNoteRef={focusedNoteRef}
            key={boardSection.id}
            boardSection={boardSection}
          />
        ))}
    </Container>
  );
};

export default Think;
