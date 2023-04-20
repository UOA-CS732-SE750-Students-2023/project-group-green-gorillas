import React from "react";
import { AuthenticationRedirect } from "../utils/AuthenticationRedirect";
import { Redirect, Route, Switch } from "react-router-dom";
import { ScreenPath } from "../index";
import { HomeScreen } from "./Home";
import { CurrentUserContextProvider } from "../../../providers/CurrentUserProvider";

export enum MainScreenPath {
  HOME = "/main/home",
  ANY = "/main/*",
}

const MainSubScreens = () => {
  return (
    <Switch>
      <Route path={MainScreenPath.HOME} component={HomeScreen} />
      <Redirect from={ScreenPath.Main} to={MainScreenPath.HOME} />
      <Redirect from={MainScreenPath.ANY} to={MainScreenPath.HOME} />
    </Switch>
  );
};

const Main = () => {
  return (
    <CurrentUserContextProvider>
      <MainSubScreens />
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
