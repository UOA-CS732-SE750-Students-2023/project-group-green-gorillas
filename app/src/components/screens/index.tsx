import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { ForgotPassword } from "./ForgotPassword";
import { Redirect } from "./Redirect";
import { Main } from "./Main";

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
      <Routes>
        <Route path={ScreenPath.Login} element={<Login />} />
        <Route path={ScreenPath.ForgotPassword} element={<ForgotPassword />} />
        <Route path={ScreenPath.Main} element={<Main />} />
        <Route
          path={ScreenPath.ANY}
          element={<Redirect path={ScreenPath.Login} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
