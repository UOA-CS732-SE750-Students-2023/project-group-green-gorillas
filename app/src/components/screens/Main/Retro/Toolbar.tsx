import React from "react";

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
import { DELETE_RETRO, MOVE_RETRO_NEXT_STAGE } from "../../../../api/api";
import Swal from "sweetalert2";
import { MainScreenPath } from "../index";

function Toolbar({ retro }: any) {
  const isFinalStage = retro.stage === RetroStage.DISCUSS;

  const nextStage = async () => {
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
      window.location.href = `${MainScreenPath.TEAM}/${retro.teamId}`;
    }
  };

  return (
    <Box className={stageStyles.toolbar} component="div">
      <Box className={styles.flex__right} component="div">
        <Box className={stageStyles.toolbar__button} component="div">
          <Box
            src={settingsIcon}
            component="img"
            alt=""
            className={stageStyles.toolbar__button__img}
          />
        </Box>
        <Box className={stageStyles.toolbar__button} component="div">
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
