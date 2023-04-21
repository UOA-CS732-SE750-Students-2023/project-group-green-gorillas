import React from "react";
import { AuthenticationRedirect } from "../utils/AuthenticationRedirect";
import { Redirect, Route, Switch } from "react-router-dom";
import { ScreenPath } from "../index";
import { HomeScreen } from "./Home";
import { CurrentUserContextProvider } from "../../../providers/CurrentUserProvider";
import { TeamScreen } from "./Team";
import { TopNavBar } from "../../common/TopNavBar";

export enum MainScreenPath {
  HOME = "/main/home",
  TEAM = "/main/team",
  ANY = "/main/*",
}

const MainSubScreens = () => {
  return (
    <Switch>
      <Route path={MainScreenPath.HOME} component={HomeScreen} />
      <Route path={`${MainScreenPath.TEAM}/:teamId`} component={TeamScreen} />
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
