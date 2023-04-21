import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MainScreenPath } from "../index";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";

export const HomeScreen = () => {
  const history = useHistory();
  const { user } = useCurrentUser();

  useEffect(() => {
    if (user?.teams && user.teams.length > 0) {
      history.replace(`${MainScreenPath.TEAM}/${user.teams[0].id}`);
    }
  }, [history, user]);

  return <div>There is no teams LOL....</div>;
};
