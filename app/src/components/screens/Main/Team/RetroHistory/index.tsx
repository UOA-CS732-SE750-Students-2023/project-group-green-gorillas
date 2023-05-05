import { Route, Switch } from "react-router-dom";
import { MainScreenPath } from "../../index";
import { RetrosScreen } from "./Retros";
import { SingleRetroHistory } from "./SingleRetroHistory";

export const RetroHistoryScreens = () => {
  return (
    <Switch>
      <Route
        path={`${MainScreenPath.TEAM}/:teamId/retro-history`}
        exact={true}
        component={RetrosScreen}
      />
      <Route
        path={`${MainScreenPath.TEAM}/:teamId/retro-history/:retroId`}
        component={SingleRetroHistory}
      />
    </Switch>
  );
};
