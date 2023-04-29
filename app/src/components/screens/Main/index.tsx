import React from "react";
import { AuthenticationRedirect } from "../utils/AuthenticationRedirect";
import { Redirect, Route, Switch } from "react-router-dom";
import { HomeScreen } from "./Home";
import { CurrentUserContextProvider } from "../../../providers/CurrentUserProvider";
import { TeamScreen } from "./Team";
import { TopNavBar } from "../../common/TopNavBar";
import { RetroHistoryScreen } from "../RetroHistory";
import { UserManagementScreen } from "../UserManagement";
import { TemplateScreen } from "../Template";
import {ProfileScreen, ProfilePath} from "../Profile";
import { ScreenPath } from "..";
import {UpdateAvatar} from "../Profile/updateAvatar";

export enum MainScreenPath {
  HOME = "/main/home",
  TEAM = "/main/team",
  ANY = "/main/*",
  RetroHistory = "/main/retro-history",
  UserManagement = "/main/user-management",
  TeamManagement = "/main/team-management",
  Profile = "/main/profile",
  Template = "/main/template",
}

const MainSubScreens = () => {
  return (
    <Switch>
      <Route path={MainScreenPath.HOME} component={HomeScreen} />
      <Route path={`${MainScreenPath.TEAM}/:teamId`} component={TeamScreen} />
      <Route
        path={MainScreenPath.RetroHistory}
        component={RetroHistoryScreen}
      />
      <Route
        path={MainScreenPath.UserManagement}
        component={UserManagementScreen}
      />
      <Route path={MainScreenPath.Template} component={TemplateScreen} />
      <Route path={MainScreenPath.Profile} component={ProfileScreen} />
      <Route path={ProfilePath.UpdateAvatar} component={UpdateAvatar} />
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
