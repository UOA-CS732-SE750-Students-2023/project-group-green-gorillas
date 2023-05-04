import { AvatarGroup, Box, Skeleton } from "@mui/material";
import { Avatar } from "../../../../common/Avatar";

import { useParams } from "react-router-dom";
import { useTeam } from "../../../../../hooks/useTeam";
import { AvatarSkeleton } from "./AvatarSkeleton";

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
