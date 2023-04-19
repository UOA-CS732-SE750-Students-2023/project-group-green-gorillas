import React from "react";
import { withAuthenticationRedirect } from "../../hoc/withAuthenticationRedirect";

export const Main = withAuthenticationRedirect(() => {
  return <div>Main</div>;
});
