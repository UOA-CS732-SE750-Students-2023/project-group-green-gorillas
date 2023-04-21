import React from "react";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";

export const TeamScreen = () => {
  const { user } = useCurrentUser();

  return <div>Hello, {user?.displayName}</div>;
};
