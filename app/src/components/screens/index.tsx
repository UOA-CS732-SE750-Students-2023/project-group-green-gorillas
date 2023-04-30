import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { LoginScreen } from "./Login";
import { ForgotPasswordScreen } from "./ForgotPassword";
import { MainScreen } from "./Main";
import { ResetPasswordScreen } from "./Main/ResetPassword";
import { UserManagementScreen } from "./Main/Admin/UserManagement";
import { OrgManagementScreen } from "./Main/Admin/OrgManagement";
import { TeamManagementScreen } from "./Main/Admin/TeamManagement";

export enum ScreenPath {
  Login = "/login",
  ForgotPassword = "/forgot-password",
  ANY = "*",
  // Protected Route
  Main = "/main",
  ResetPassword = "/reset-password",
  UserManagement = "/user-management",
  TeamManagement = "/team-management",
  OrgManagement = "/org-management",
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
        <Route
          path={ScreenPath.UserManagement}
          component={UserManagementScreen}
        />

        <Route
          path={ScreenPath.TeamManagement}
          component={TeamManagementScreen}
        />

        <Route
          path={ScreenPath.OrgManagement}
          component={OrgManagementScreen}
        />

        <Route path={ScreenPath.Main} component={MainScreen} />
        <Redirect from={ScreenPath.ANY} to={ScreenPath.Login} />
      </Switch>
    </BrowserRouter>
  );
};
