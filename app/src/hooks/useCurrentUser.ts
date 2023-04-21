import { useContext, useMemo } from "react";
import { CurrentUserContext } from "../providers/CurrentUserProvider";
import { UseRole } from "../types/user";

export const useCurrentUser = () => {
  const { user, getCurrentUser } = useContext(CurrentUserContext);

  const isAdmin = useMemo(() => {
    return user?.role === UseRole.ADMIN;
  }, [user]);

  return {
    user,
    isAdmin,
    getCurrentUser,
  };
};
