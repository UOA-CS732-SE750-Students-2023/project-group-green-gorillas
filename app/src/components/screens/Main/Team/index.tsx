import { TeamDrawer } from "../../../common/TeamDrawer";
import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useTeam } from "../../../../hooks/useTeam";
import { Route, Switch, useHistory, useParams } from "react-router-dom";
import { MainScreenPath } from "../index";
import { TeamDashboardScreen } from "./Dashboard";
import { TemplateScreen } from "./Template";
import { RetroHistoryScreen } from "./RetroHistory";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";

export const TeamScreen = () => {
  const history = useHistory();
  const { user } = useCurrentUser();
  const { teamId } = useParams<{ teamId: string }>();

  useEffect(() => {
    if (!user?.teams?.find((team) => teamId === team.id)) {
      history.replace(`${MainScreenPath.HOME}`);
    }
  }, [user, history]);

  return (
    <Container maxWidth="xl" sx={{ marginTop: 2, display: "flex" }}>
      <TeamDrawer teamId={teamId} />
      <Switch>
        <Route
          path={`${MainScreenPath.TEAM}/:teamId/dashboard`}
          component={TeamDashboardScreen}
        />
        <Route
          path={`${MainScreenPath.TEAM}/:teamId/template`}
          component={TemplateScreen}
        />
        <Route
          path={`${MainScreenPath.TEAM}/:teamId/retro-history`}
          component={RetroHistoryScreen}
        />
      </Switch>
    </Container>
  );
};
