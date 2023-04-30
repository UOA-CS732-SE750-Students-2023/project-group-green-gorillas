import React from "react";
import { AuthenticationRedirect } from "../utils/AuthenticationRedirect";
import { Redirect, Route, Switch } from "react-router-dom";
import { HomeScreen } from "./Home";
import { CurrentUserContextProvider } from "../../../providers/CurrentUserProvider";
import { TeamScreen } from "./Team";
import { TopNavBar } from "../../common/TopNavBar";
import { RetroHistoryScreen } from "../RetroHistory";
import { UserManagementScreen } from "../UserManagement";
import { OrgManagementScreen } from "../OrgManagement";
import { TeamManagementScreen } from "../TeamManagement";
import { TemplateScreen } from "../Template";
import {ProfileScreen, ProfilePath} from "../Profile";
import { RetroHistoryScreen } from "./RetroHistory";
import { UserManagementScreen } from "./Admin/UserManagement";
import { OrgManagementScreen } from "./Admin/OrgManagement";
import { TeamManagementScreen } from "./Admin/TeamManagement";
import { TemplateScreen } from "./Template";
import { ProfileScreen } from "./Profile";
import { ScreenPath } from "..";
import {UpdateAvatar} from "../Profile/updateAvatar";
import { RetroScreen } from "../Retro";
import { retros } from "./defaultData";
import { RetroScreen } from "./Retro";
import { AdminScreen } from "./Admin";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

export enum MainScreenPath {
  HOME = "/main/home",
  TEAM = "/main/team",
  ANY = "/main/*",
  RetroHistory = "/main/retro-history",
  Profile = "/main/profile",
  Template = "/main/template",
  Retro = "/main/retro",
  ADMIN = "/main/admin",
}

const MainSubScreens = () => {
  const { isAdmin } = useCurrentUser();

  return (
    <Switch>
      <Route path={MainScreenPath.HOME} component={HomeScreen} />
      <Route
        path={`${MainScreenPath.Template}/:teamId`}
        component={TemplateScreen}
      />
      <Route path={`${MainScreenPath.TEAM}/:teamId`} component={TeamScreen} />
      <Route
        path={MainScreenPath.RetroHistory}
        component={RetroHistoryScreen}
      />
      <Route path={MainScreenPath.Profile} component={ProfileScreen} />
      <Route
        path={`${MainScreenPath.Retro}/:retroId/team/:teamId/`}
        component={RetroScreen}
      />
      {isAdmin && <Route path={MainScreenPath.ADMIN} component={AdminScreen} />}


      <Redirect from={ScreenPath.Main} to={MainScreenPath.HOME} />
      <Redirect from={MainScreenPath.ANY} to={MainScreenPath.HOME} />
    </Switch>
  )
}

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
