import React from "react";
import { withAuthenticationRedirect } from "../../hoc/withAuthenticationRedirect";

export const Login = withAuthenticationRedirect(() => {
  return <div>Login Screen</div>;
});
