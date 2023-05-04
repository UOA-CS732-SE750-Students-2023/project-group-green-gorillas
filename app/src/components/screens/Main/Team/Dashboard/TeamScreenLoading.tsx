import { Box, Skeleton } from "@mui/material";
import { AvatarSkeleton } from "./AvatarSkeleton";

export const TeamScreenLoading = () => {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 5, width: "100%" }}>
      <Skeleton variant="rounded" width={210} height={40} />
      <AvatarSkeleton />
    </Box>
  );
};
