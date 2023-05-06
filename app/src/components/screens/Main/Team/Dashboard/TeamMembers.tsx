import { AvatarGroup, Box, Skeleton } from "@mui/material";
import { Avatar } from "../../../../common/Avatar";

import { useParams } from "react-router-dom";
import { TeamWithMembers, useTeam } from "../../../../../hooks/useTeam";
import { AvatarSkeleton } from "./AvatarSkeleton";
import { Team } from "../../../../../types/team";

type Props = {
  team: TeamWithMembers | null;
  loading: boolean;
};

export const TeamMembers = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { team, loading } = useTeam(teamId);

  return (
    <Box>
      {loading ? (
        <AvatarSkeleton />
      ) : (
        <AvatarGroup sx={{ width: 185 }}>
          {team?.teamMembers?.map((member) => (
            <Avatar
              key={member.id}
              text={`${member.firstName} ${member.lastName}`}
            />
          ))}
        </AvatarGroup>
      )}
    </Box>
  );
};
