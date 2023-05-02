import React from "react";

import { useHistory } from "react-router-dom";
import stageStyles from "./styles/stage.module.css";
import styles from "./styles/styles.module.css";
import settingsIcon from "../../../../assets/settings.svg";
import bellIcon from "../../../../assets/bell.svg";
import timerIcon from "../../../../assets/timer.svg";
import infoIcon from "../../../../assets/info.svg";
import nextIcon from "../../../../assets/carot.svg";
import { Box } from "@mui/material";
import { RetroStage } from "./Stage";
import { request } from "../../../../api/request";
import { MOVE_RETRO_NEXT_STAGE } from "../../../../api/api";

function Toolbar({ retro }: any) {
  const nextStage = async () => {
    await request.patch(MOVE_RETRO_NEXT_STAGE, {
      retroId: retro.id,
      teamId: retro.teamId,
    });
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
            src={bellIcon}
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
        <Box className={stageStyles.toolbar__button} component="div">
          <Box
            component="img"
            src={infoIcon}
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
          {retro.stage === RetroStage.DISCUSS ? "End Retro" : "Next Stage"}
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
