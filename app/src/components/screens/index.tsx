import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Login";
import { ForgotPassword } from "./ForgotPassword";
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
          element={<Navigate to={ScreenPath.Login} replace={true} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
