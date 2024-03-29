import React, { useEffect, useMemo, useState } from "react";

import stageStyles from "./styles/stage.module.css";
import styles from "./styles/styles.module.css";
import settingsIcon from "../../../../assets/settings.svg";
import quitIcon from "../../../../assets/quit.png";
import timerIcon from "../../../../assets/timer.svg";
import cancelIcon from "../../../../assets/cancel.png";
import nextIcon from "../../../../assets/carot.svg";
import { Box } from "@mui/material";
import { RetroStage } from "./Stage";
import { request } from "../../../../api/request";
import {
  DELETE_RETRO,
  MOVE_RETRO_NEXT_STAGE,
  SET_RETRO_SESSION_PAYLOAD,
  UPDATE_RETRO_NAME,
} from "../../../../api/api";
import Swal from "sweetalert2";
import { MainScreenPath } from "../index";
import { DateTime } from "luxon";

function Toolbar({ retro, timer, teamRole }: any) {
  const isFinalStage = retro.stage === RetroStage.REVIEW;

  const boardNoteLength = useMemo(() => {
    return retro.boardSections.reduce((acc: any, section: any) => {
      return acc + section.boardNotes.length;
    }, 0);
  }, [retro.boardSections]);

  const nextStage = async () => {
    if (teamRole === "MEMBER") {
      await showNoPermissionAlert();
      return;
    }

    if (retro.stage === RetroStage.THINK && boardNoteLength === 0) {
      await Swal.fire({
        title: "You can not move to next stage",
        text: "The board need to have at least one note",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const result = await Swal.fire({
      title: isFinalStage
        ? "Are you sure to end your retro?"
        : "Are you sure to move your retro to next stage?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
    });

    if (result.isConfirmed) {
      await request.patch(MOVE_RETRO_NEXT_STAGE, {
        retroId: retro.id,
        teamId: retro.teamId,
      });
    }
  };

  const onTerminateRetro = async () => {
    if (teamRole === "MEMBER") {
      await showNoPermissionAlert();
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure to terminate retro?",
      text: "Terminating retro will delete the retro",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
    });

    if (!result.isConfirmed) return;

    await Swal.fire({
      title: "Please enter current retro name to terminate retro!",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      inputValidator(inputValue: string) {
        if (!inputValue) {
          return "Retro name cannot be empty";
        }

        if (inputValue !== retro.name) {
          return "Retro name is incorrect";
        }

        return null;
      },
      async preConfirm() {
        await request.delete(DELETE_RETRO(retro.id, retro.teamId));
      },
      allowOutsideClick: false,
    });
  };

  const onSetTimer = async () => {
    if (teamRole === "MEMBER") {
      await showNoPermissionAlert();
      return;
    }

    if (timer) {
      const result = await Swal.fire({
        title: "Are you sure to reset timer?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        allowOutsideClick: false,
      });

      if (!result.isConfirmed) return;

      return request.patch(SET_RETRO_SESSION_PAYLOAD, {
        retroId: retro.id,
        teamId: retro.teamId,
        sessionPayload: JSON.stringify({
          ...retro.sessionPayload,
          timerExpiredTimeStamp: null,
        }),
      });
    }

    await Swal.fire({
      title: "Set Up Your Timer",
      text: "Please enter the seconds to set up your retro timer. eg. 60, 120, 180, 240, 300 seconds",
      input: "number",
      inputValue: "300",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      inputValidator(inputValue: string) {
        if (!inputValue) {
          return "input cannot be empty.";
        }

        if (Number.parseInt(inputValue) <= 0) {
          return "input need to be greater than 0";
        }

        return null;
      },
      async preConfirm(value: string) {
        const seconds = Number.parseInt(value);
        await request.patch(SET_RETRO_SESSION_PAYLOAD, {
          retroId: retro.id,
          teamId: retro.teamId,
          sessionPayload: JSON.stringify({
            ...retro.sessionPayload,
            timerExpiredTimeStamp: DateTime.now()
              .plus({ second: seconds })
              .toMillis(),
          }),
        });
      },
      allowOutsideClick: false,
    });
  };

  const onQuit = async () => {
    const result = await Swal.fire({
      title: "Are you sure to exit?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
    });

    if (result.isConfirmed) {
      window.location.href = `${MainScreenPath.TEAM}/${retro.teamId}/dashboard`;
    }
  };

  const showNoPermissionAlert = async () => {
    await Swal.fire({
      title: "You have no permission to do this action",
      text: "Please ask your team lead for help",
      icon: "error",
      confirmButtonColor: "#3085d6",
    });
  };

  const updateRetroName = async () => {
    if (teamRole === "MEMBER") {
      await showNoPermissionAlert();
      return;
    }

    const result = await Swal.fire({
      title: "Submit your new retro name",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      inputValidator(inputValue: string) {
        if (!inputValue) {
          return "input cannot be empty.";
        }

        return null;
      },
      allowOutsideClick: () => !Swal.isLoading(),
      async preConfirm(value: string) {
        await request.patch(UPDATE_RETRO_NAME, {
          id: retro.id,
          teamId: retro.teamId,
          name: value,
        });
      },
    });
  };

  return (
    <Box className={stageStyles.toolbar} component="div">
      <Box className={styles.flex__right} component="div">
        <Box
          onClick={updateRetroName}
          className={stageStyles.toolbar__button}
          component="div"
        >
          <Box
            src={settingsIcon}
            component="img"
            alt=""
            className={stageStyles.toolbar__button__img}
          />
        </Box>
        <Box
          onClick={onSetTimer}
          className={stageStyles.toolbar__button}
          component="div"
        >
          <Box
            component="img"
            src={timerIcon}
            alt=""
            className={stageStyles.toolbar__button__img}
          />
        </Box>
        <Box
          onClick={onTerminateRetro}
          className={stageStyles.toolbar__button}
          component="div"
        >
          <Box
            component="img"
            src={cancelIcon}
            alt=""
            className={stageStyles.toolbar__button__img}
          />
        </Box>
        <Box
          onClick={onQuit}
          className={stageStyles.toolbar__button}
          component="div"
        >
          <Box
            src={quitIcon}
            component="img"
            alt=""
            className={stageStyles.toolbar__button__img}
          />
        </Box>
      </Box>
      <Box className={styles.flex__left} component="div">
        <Box
          className={stageStyles.next__button}
          component="div"
          onClick={nextStage}
        >
          {isFinalStage ? "End Retro" : "Next Stage"}
          <Box
            component="img"
            src={nextIcon}
            alt=""
            className={stageStyles.toolbar__button__img}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Toolbar;
