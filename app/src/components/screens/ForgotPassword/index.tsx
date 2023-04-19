import React from "react";
import { withAuthenticationRedirect } from "../../hoc/withAuthenticationRedirect";

export const ForgotPassword = withAuthenticationRedirect(() => {
  return <div>Forgot Password</div>;
});
