import { LoadingIndicator } from "../../../../common/LoadingIndicator";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { MainScreenPath } from "../../index";

export const Finalized = ({ retro }: any) => {
  const history = useHistory();

  useEffect(() => {
    history.replace(`${MainScreenPath.TEAM}/${retro.teamId}`); // TODO: navigate to summary page
  }, []);

  return <LoadingIndicator />;
};
