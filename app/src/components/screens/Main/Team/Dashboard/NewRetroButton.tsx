import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { TeamRole } from "../../../../../types/teamRole";
import { useHistory } from "react-router-dom";
import { MainScreenPath } from "../../index";

type Props = {
  teamId: string | undefined;
  teamRole: TeamRole | null;
};

export const NewRetroButton = ({ teamId, teamRole }: Props) => {
  const history = useHistory();

  return (
    <Box>
      {teamRole?.role !== "MEMBER" ? (
        <Button
          onClick={() =>
            history.push(`${MainScreenPath.TEAM}/${teamId}/template`)
          }
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Retro
        </Button>
      ) : null}
    </Box>
  );
};
