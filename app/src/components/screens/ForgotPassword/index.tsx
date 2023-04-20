import React from "react";
import { AuthenticationRedirect } from "../utils/AuthenticationRedirect";

const ForgotPassword = () => {
  return <div>Forgot Password</div>;
};

export const ForgotPasswordScreen = () => {
  return (
    <AuthenticationRedirect>
      <ForgotPassword />
    </AuthenticationRedirect>
  );
};
