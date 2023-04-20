import { useContext, useMemo } from "react";
import { CurrentUserContext } from "../providers/CurrentUserProvider";
import { UserType } from "../types/user";

export const useCurrentUser = () => {
  const { user, getCurrentUser } = useContext(CurrentUserContext);

  const isAdmin = useMemo(() => {
    return user?.type === UserType.ADMIN;
  }, [user]);

  return {
    user,
    isAdmin,
    getCurrentUser,
  };
};
