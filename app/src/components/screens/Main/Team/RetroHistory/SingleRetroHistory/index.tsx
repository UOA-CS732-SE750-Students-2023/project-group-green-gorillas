import { Box, Container, Skeleton, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { MainScreenPath } from "../../../../../screens/Main";
import { request } from "../../../../../../api/request";
import { GET_RETRO } from "../../../../../../api/api";
import Styles from "../../../Retro/styles/styles.module.css";
import { Avatar } from "../../../../../common/Avatar";

export const SingleRetroHistory = () => {
  const [retro, setRetro] = useState<any>(null);
  const [isLoadingRetroData, setIsLoadingRetroData] = useState<boolean>(true);

  const { teamId, retroId } = useParams<{
    teamId: string;
    retroId: string;
  }>();

  const redirectToTeamDashboard = () => {
    window.location.href = `${MainScreenPath.TEAM}/${teamId}/dashboard`;
  };
  const getRetro = async () => {
    setIsLoadingRetroData(true);
    try {
      const { data } = await request.get(GET_RETRO(retroId, teamId));
      setRetro(data);
    } catch (error) {
      redirectToTeamDashboard();
    } finally {
      setIsLoadingRetroData(false);
    }
  };

  const user = retro?.createdByUser;

  const userFullName = useMemo(() => {
    if (!user) return "";

    return `${user.firstName} ${user.lastName}`;
  }, [user]);

  useEffect(() => {
    (async () => {
      await getRetro();
    })();
  }, [retroId, teamId]);

  console.log("🚀 ~ file: index.tsx:12 ~ SingleRetroHistory ~ retro:", retro);
  if (!retro) return null;

  if (isLoadingRetroData) {
    return <Skeleton variant="rectangular" width={"70vw"} height={"100vh"} />;
  }
  return (
    <Container>
      <Container
        sx={{
          paddingTop: 10,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          color="textSecondary"
          className={Styles.heading}
        >
          {retro?.name}
        </Typography>
        <Box
          sx={{ flexDirection: "row", display: "flex", alignItems: "center" }}
        >
          <Typography
            variant="body1"
            color="textSecondary"
            className={Styles.select__heading}
            sx={{
              paddingRight: 1,
            }}
          >
            {` Facilitator: 
            ${retro?.createdByUser?.displayName}`}
          </Typography>
          <Avatar text={userFullName} />
        </Box>
        <Typography
          variant="body1"
          color="textSecondary"
          className={Styles.select__heading}
          sx={{
            paddingRight: 1,
          }}
        >
          {`Created at: 
          ${retro?.createdAt.slice(0, 10)}`}
        </Typography>
      </Container>
    </Container>
  );
};
