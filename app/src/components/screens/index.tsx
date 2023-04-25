import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { LoginScreen } from "./Login";
import { ForgotPasswordScreen } from "./ForgotPassword";
import { MainScreen } from "./Main";
import { ResetPasswordScreen } from "./ResetPassword";
import { MonicaScreen } from "./Monica";
import { JennyScreen } from "./Jenny";
import { ChunkScreen } from "./Chunk";
import { EthanScreen } from "./Ethan";

export enum ScreenPath {
  Login = "/login",
  ForgotPassword = "/forgot-password",
  ANY = "*",
  // Protected Route
  Main = "/main",
  ResetPassword = "/reset-password",
  Monica = "/monica",
  Ethan = "/ethan",
  Jenny = "/jenny",
  Chunk = "/chunk",
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
        <Route path={ScreenPath.Monica} component={MonicaScreen} />
        <Route path={ScreenPath.Jenny} component={JennyScreen} />
        <Route path={ScreenPath.Chunk} component={ChunkScreen} />
        <Route path={ScreenPath.Ethan} component={EthanScreen} />
        <Redirect from={ScreenPath.ANY} to={ScreenPath.Login} />
      </Switch>
    </BrowserRouter>
  );
};
