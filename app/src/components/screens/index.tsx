import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { LoginScreen } from "./Login";
import { ForgotPasswordScreen } from "./ForgotPassword";
import { MainScreen } from "./Main";

export enum ScreenPath {
  Login = "/login",
  ForgotPassword = "/forgot-password",
  ANY = "*",
  // Protected Route
  Main = "/main",
}

export const Screens = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ScreenPath.Login} component={LoginScreen} />
        <Route
          path={ScreenPath.ForgotPassword}
          component={ForgotPasswordScreen}
        />
        <Route path={ScreenPath.Main} component={MainScreen} />
        <Redirect from={ScreenPath.ANY} to={ScreenPath.Login} />
      </Switch>
    </BrowserRouter>
  );
};
