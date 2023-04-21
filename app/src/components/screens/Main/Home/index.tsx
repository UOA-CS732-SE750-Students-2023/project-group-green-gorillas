import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { MainScreenPath } from "../index";

export const HomeScreen = () => {
  const history = useHistory();

  useEffect(() => {
    if (true) {
      history.replace(`${MainScreenPath.TEAM}/qweqwewqeqw`);
    }
  }, [history]);

  return <div>There is no teams LOL....</div>;
};
