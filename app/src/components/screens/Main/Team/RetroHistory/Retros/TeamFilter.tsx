import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import { Team } from "../../../../../../types/team";
type User = {
  id: string;
  teams: Team[];
};

type TeamFilterProps = {
  selectedTeam: string | undefined;
  handleChange: (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => void;
  user: User | null;
};

export const TeamFilter = ({
  selectedTeam,
  handleChange,
  user,
}: TeamFilterProps) => {
  return (
    <Box>
      <FormControl sx={{ minWidth: 80 }}>
        <Select value={selectedTeam} onChange={handleChange} autoWidth>
          {user?.teams.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
