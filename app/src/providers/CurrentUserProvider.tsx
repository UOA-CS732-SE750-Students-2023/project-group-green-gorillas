import React, { useEffect, useState } from "react";
import { User } from "../types/user";
import { Organisation } from "../types/organisation";
import { LoadingIndicator } from "../components/common/LoadingIndicator";
import { request } from "../api/request";
import { CURRENT_USER } from "../api/api";
import { Team } from "../types/team";

export type CurrentUser = User & {
  organisation: Organisation;
  teams: Team[];
};

type CurrentUserContextType = {
  user: CurrentUser | null;
  getCurrentUser: () => Promise<void>;
};

export const CurrentUserContext = React.createContext<CurrentUserContextType>({
  user: null,
  getCurrentUser: async () => {},
});



type Props = {
  children: JSX.Element;
};

export const CurrentUserContextProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const getCurrentUser = async () => {
    const { data } = await request.get<CurrentUser>(CURRENT_USER);
    setCurrentUser(data);
  };

  useEffect(() => {
    (async () => {
      await getCurrentUser();
    })();
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        user: currentUser,
        getCurrentUser,
      }}
    >
      {currentUser ? children : <LoadingIndicator />}
    </CurrentUserContext.Provider>
  );
};
