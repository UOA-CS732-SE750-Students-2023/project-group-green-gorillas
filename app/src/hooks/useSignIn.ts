import { useCallback, useMemo, useState } from "react";
import { authService } from "../services/authService";
import { useHistory } from "react-router-dom";
import { parseQueryString } from "../utils/parseQueryString";
import { MainScreenPath } from "../components/screens/Main";

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const history = useHistory();

  const { callback } = useMemo(() => {
    return parseQueryString(history?.location?.search ?? "");
  }, [history]);

  const onSignIn = useCallback(
    async (email: string, password: string, isRememberMe: boolean) => {
      if (!email) {
        setError("Email is required.");
        return;
      }

      if (!password) {
        setError("Password is required.");
        return;
      }

      setIsLoading(true);

      try {
        await authService.signIn(email, password, isRememberMe);

        window.location.href = callback ? callback : MainScreenPath.HOME;
      } catch (_) {
        setError(
          "The login details you entered did not match our records. Please double-check and try again"
        );
        setIsLoading(false);
      }
    },
    [callback]
  );

  return {
    onSignIn,
    isLoading,
    error,
  };
};
