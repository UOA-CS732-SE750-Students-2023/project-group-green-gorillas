import React from "react";
import { AuthenticationRedirect } from "../../AuthenticationRedirect";

export const Main = () => {
  return (
    <AuthenticationRedirect>
      <div>Main</div>
    </AuthenticationRedirect>
  );
};
