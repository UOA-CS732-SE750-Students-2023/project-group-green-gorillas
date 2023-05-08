import {
  Box,
  Container,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MainScreenPath } from "../../../../../screens/Main";
import { request } from "../../../../../../api/request";
import { GET_RETRO } from "../../../../../../api/api";
import Styles from "../../../Retro/styles/styles.module.css";
import { Avatar } from "../../../../../common/Avatar";
import { ActionList } from "../../Dashboard/ActionList";
import { useTeamRole } from "../../../../../../hooks/useTeamRole";
import { ActionListItem } from "../../Dashboard/ActionListItem";
import { ActionItemStatus } from "../../../../../../types/actionItems";
import Vote from "../../../Retro/Vote";
import retroStyles from "../../../Retro/styles/retro.module.css";
import { useTeam } from "../../../../../../hooks/useTeam";

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
  const retroUsers = retro?.participants;
  const author = retro?.createdByUser;
  const { teamRole } = useTeamRole(teamId);
  const { team } = useTeam(teamId);

  const userFullName = useMemo(() => {
    if (!author) return "";

    return `${author.firstName} ${author.lastName}`;
  }, [author]);

  const averageTimeInvestRate = useMemo(() => {
    const sum =
      retro?.boardTimeInvests?.reduce((acc: any, invest: any) => {
        return acc + invest.rate;
      }, 0) ?? 0;

    const length = retro?.boardTimeInvests?.length;

    if (!length) return 0;

    return sum / length;
  }, [retro?.boardTimeInvests]);

  const ref = useRef<any>();

  useEffect(() => {
    (async () => {
      await getRetro();
    })();
  }, [retroId, teamId]);

  console.log("🚀 ~ file: index.tsx:12 ~ SingleRetroHistory ~ retro:", retro);
  if (!retro || !team) return null;

  if (isLoadingRetroData) {
    return <Skeleton variant="rectangular" width={"70vw"} height={"100vh"} />;
  }
  return (
    <Container>
      <div ref={ref}>
        <Container
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 10,
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
        <Box sx={{ height: "auto" }}>
          <Vote retro={retro} isSingleRetroHistory={true} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            component="div"
            sx={{
              bgcolor: "#F5F7F9",
              padding: 3,
              borderRadius: 2,
              justifyItems: "center",
              width: "50%",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              noWrap
              sx={{ marginBottom: 2 }}
            >
              In progress Action Items
            </Typography>
            {retro?.actionItems
              ?.filter(
                (actionItem: any) =>
                  actionItem.status === ActionItemStatus.IN_PROGRESS
              )
              .map((actionItem: any) => (
                <ActionListItem
                  key={actionItem.id}
                  actionItem={actionItem}
                  teamId={teamId}
                  teamRole={teamRole}
                  completed={true}
                />
              ))}
          </Box>
          <Box
            component="div"
            sx={{
              bgcolor: "#F5F7F9",
              padding: 3,
              borderRadius: 2,
              justifyItems: "center",
              width: "50%",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              noWrap
              sx={{ marginBottom: 2 }}
            >
              Completed Action Items
            </Typography>
            {retro?.actionItems
              ?.filter(
                (actionItem: any) =>
                  actionItem.status === ActionItemStatus.COMPLETED
              )
              .map((actionItem: any) => (
                <ActionListItem
                  key={actionItem.id}
                  actionItem={actionItem}
                  teamId={teamId}
                  teamRole={teamRole}
                  completed={true}
                />
              ))}
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography className={retroStyles.header__title}>
            Participants
          </Typography>
          <List className={retroStyles.participants__list}>
            {retroUsers?.map((user: any) => (
              <ListItem className={retroStyles.participant} key={user.id}>
                <Tooltip
                  title={`${user.displayName} (${user.firstName} ${user.lastName}) (${user.email})`}
                >
                  <ListItemAvatar>
                    <Avatar text={`${user.firstName} ${user.lastName}`} />
                  </ListItemAvatar>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Typography className={retroStyles.header__title}>
            Average Rate For Return on Time Invested: {averageTimeInvestRate}
          </Typography>
        </Box>
      </div>
    </Container>
  );
};
