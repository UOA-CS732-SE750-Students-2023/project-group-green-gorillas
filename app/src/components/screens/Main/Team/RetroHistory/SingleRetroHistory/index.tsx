import {
  Box,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
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

//64bc116d-0f81-4f27-8324-b9b172142b73
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

  const userFullName = useMemo(() => {
    if (!author) return "";

    return `${author.firstName} ${author.lastName}`;
  }, [author]);

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
      <Box sx={{ height: "auto" }}>
        <Vote retro={retro} isSingleRetroHistory={true} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ActionList
          teamId={teamId}
          user={author}
          teamRole={teamRole}
          isSingleRetro={true}
        />
        <Box
          component="div"
          sx={{
            bgcolor: "#F5F7F9",
            padding: 3,
            borderRadius: 2,
            justifyItems: "center",
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
              (actionItem) => actionItem.status === ActionItemStatus.COMPLETED
            )
            .map((actionItem) => (
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
          {retroUsers?.map((user) => (
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
    </Container>
  );
};
