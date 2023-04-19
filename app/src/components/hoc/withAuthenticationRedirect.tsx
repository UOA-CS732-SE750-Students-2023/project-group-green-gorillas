import React, { useEffect, useState } from "react";
import { tokenService, TokenType } from "../../services/tokenService";
import { ScreenPath } from "../screens";
import { LoadingIndicator } from "../../common/LoadingIndicator";

export const withAuthenticationRedirect = (Component: () => JSX.Element) => {
  return () => {
    const validatePath = async () => {
      await new Promise<void>((resolve) => {
        const pathName = window.location.pathname;

        const accessToken = tokenService.getToken(TokenType.ACCESS_TOKEN);

        if (pathName && pathName.includes(ScreenPath.Main)) {
          if (!accessToken) {
            window.location.href = ScreenPath.Login;
          }
        } else {
          if (accessToken) {
            window.location.href = ScreenPath.Main;
          }
        }

        return resolve();
      });
    };

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      setIsLoading(true);
      validatePath().finally(() => {
        setIsLoading(false);
      });
    }, []);

    return isLoading ? <LoadingIndicator /> : <Component />;
  };
};
