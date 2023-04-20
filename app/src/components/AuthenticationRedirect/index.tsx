import React, { useEffect, useState } from "react";
import { tokenService, TokenType } from "../../services/tokenService";
import { ScreenPath } from "../screens";
import { LoadingIndicator } from "../common/LoadingIndicator";

type Props = {
  children: JSX.Element;
};

export const AuthenticationRedirect: React.FC<Props> = ({ children }) => {
  const validatePath = () => {
    return new Promise<boolean>((resolve) => {
      const pathName = window.location.pathname;

      const accessToken = tokenService.getToken(TokenType.ACCESS_TOKEN);

      if (pathName && pathName.startsWith(ScreenPath.Main)) {
        if (!accessToken) {
          window.location.href = ScreenPath.Login;
          return resolve(true);
        }
      } else {
        if (accessToken) {
          window.location.href = ScreenPath.Main;
          return resolve(true);
        }
      }

      return resolve(false);
    });
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const willRedirect = await validatePath();

      if (!willRedirect) {
        setIsLoading(false);
      }
    })();
  }, []);

  return isLoading ? <LoadingIndicator /> : children;
};
