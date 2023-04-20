import { useCallback } from "react";
import { authService } from "../services/authService";
import { ScreenPath } from "../components/screens";

export const useSignOut = () => {
  const onSignOut = useCallback(async () => {
    await authService.signOut();

    window.location.href = ScreenPath.Login;
  }, []);

  return {
    onSignOut,
  };
};
