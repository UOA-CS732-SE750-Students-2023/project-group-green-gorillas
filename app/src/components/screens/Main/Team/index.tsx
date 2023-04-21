import React from "react";
import { useSignOut } from "../../../../hooks/useSignOut";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";

export const TeamScreen = () => {
  const { onSignOut } = useSignOut();
  const { user } = useCurrentUser();

  return (
    <div>
      Hello, {user?.displayName}
      <br />
      <button onClick={onSignOut}>Sign out</button>
    </div>
  );
};
