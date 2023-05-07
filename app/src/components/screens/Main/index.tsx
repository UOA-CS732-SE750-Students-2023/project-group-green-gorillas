import React from "react";
import { AuthenticationRedirect } from "../utils/AuthenticationRedirect";
import { Redirect, Route, Switch } from "react-router-dom";
import { HomeScreen } from "./Home";
import { CurrentUserContextProvider } from "../../../providers/CurrentUserProvider";
import { TopNavBar } from "../../common/TopNavBar";
import { RetroHistoryScreen } from "./RetroHistory";
import { TemplateScreen } from "./Template";
import { ProfileScreen } from "./Profile";
import { ScreenPath } from "..";
import { RetroScreen } from "./Retro";
import { AdminScreen } from "./Admin";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { TeamScreen } from "./Team";

export enum MainScreenPath {
  HOME = "/main/home",
  TEAM = "/main/team",
  ANY = "/main/*",
  Profile = "/main/profile",
  Retro = "/main/retro",
  ADMIN = "/main/admin",
}

const MainSubScreens = () => {
  const { isAdmin } = useCurrentUser();

  return (
    <Switch>
      <Route path={MainScreenPath.HOME} component={HomeScreen} />
      <Route path={`${MainScreenPath.TEAM}/:teamId`} component={TeamScreen} />
      <Route path={MainScreenPath.Profile} component={ProfileScreen} />
      <Route
        path={`${MainScreenPath.Retro}/:retroId/team/:teamId/`}
        component={RetroScreen}
      />
      {isAdmin && <Route path={MainScreenPath.ADMIN} component={AdminScreen} />}
      <Redirect from={ScreenPath.Main} to={MainScreenPath.HOME} />
      <Redirect from={MainScreenPath.ANY} to={MainScreenPath.HOME} />
    </Switch>
  );
};

const Main = () => {
  return (
    <CurrentUserContextProvider>
      <>
        <TopNavBar />
        <MainSubScreens />
      </>
    </CurrentUserContextProvider>
  );
};

export const MainScreen = () => {
  return (
    <AuthenticationRedirect>
      <Main />
    </AuthenticationRedirect>
  );
};
