import { Box, Skeleton } from "@mui/material";

export const AvatarSkeleton = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
    </Box>
  );
};
