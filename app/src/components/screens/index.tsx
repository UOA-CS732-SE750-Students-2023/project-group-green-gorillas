import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { LoginScreen } from "./Login";
import { ForgotPasswordScreen } from "./ForgotPassword";
import {MainScreen, MainScreenPath} from "./Main";
import { ResetPasswordScreen } from "./ResetPassword";
import {TemplateScreen} from "./Template";

export enum ScreenPath {
  Login = "/login",
  ForgotPassword = "/forgot-password",
  ANY = "*",
  // Protected Route
  Main = "/main",
  ResetPassword = "/reset-password",
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
        <Route
          path={ScreenPath.ResetPassword}
          component={ResetPasswordScreen}
        />
        <Route path={ScreenPath.Main} component={MainScreen} />
        <Redirect from={ScreenPath.ANY} to={ScreenPath.Login} />
      </Switch>
    </BrowserRouter>
  );
};
