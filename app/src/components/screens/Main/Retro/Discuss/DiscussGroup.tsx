import { Box } from "@mui/material";
import React from "react";
import stageStyles from "../styles/stage.module.css";

function DiscussGroup({ group }: any) {
  return (
    <div>
      <Box className={stageStyles.notes__group}>
        <Box className={stageStyles.group__heading}>{group.name}</Box>
        <div>
          {group.items.map((item, index) => {
            return (
              <Box
                className={stageStyles.note__wrapper}
                style={{ marginBottom: "8px" }}
              >
                <Box
                  className={
                    [
                      stageStyles.note__container,
                      stageStyles[`note__container__${item.color}`],
                    ] as any
                  }
                >
                  {item.value}
                </Box>
              </Box>
            );
          })}
        </div>
      </Box>
    </div>
  );
}

export default DiscussGroup;
