import React, { useState } from "react";
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
import { ProfileScreen } from "../Profile";
import { ScreenPath } from "..";
import { RetroScreen } from "../Retro";
import { retros } from "./defaultData";

export enum MainScreenPath {
  HOME = "/main/home",
  TEAM = "/main/team",
  ANY = "/main/*",
  RetroHistory = "/main/retro-history",
  UserManagement = "/main/user-management",
  TeamManagement = "/main/team-management",
  OrgManagement = "/main/org-management",
  Profile = "/main/profile",
  Template = "/main/template",
  Retro = "/main/retro",
}

const MainSubScreens = () => {
  const [selectedRetro, setSelectedRetro] = useState(0);
  const [actionItems, setActionItems] = useState([]);
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
      <Route
        path={MainScreenPath.TeamManagement}
        component={TeamManagementScreen}
      />
      <Route
        path={MainScreenPath.OrgManagement}
        component={OrgManagementScreen}
      />
      <Route path={MainScreenPath.Template} component={TemplateScreen} />
      <Route path={MainScreenPath.Profile} component={ProfileScreen} />
      <Route path={`${MainScreenPath.Retro}/:retroId/team/:teamId/`}>
        <RetroScreen
          retro={retros[selectedRetro]}
          actionItems={actionItems}
          setActionItems={setActionItems}
        />
      </Route>

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
