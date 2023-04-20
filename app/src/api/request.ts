import axios from "axios";
import { tokenService, TokenType } from "../services/tokenService";
import { ScreenPath } from "../components/screens";
import { authService } from "../services/authService";

const request = axios.create({
  timeout: 15000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

request.interceptors.request.use(
  (config: any) => {
    const accessToken = tokenService.getToken(TokenType.ACCESS_TOKEN);

    if (!accessToken) {
      tokenService.clearAllTokens();
      window.location.href = ScreenPath.Login;
    }

    if (config.headers) {
      config.headers["Authorization"] = accessToken;
    } else {
      config = {
        ...config,
        headers: {
          Authorization: accessToken,
        },
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await authService.refreshToken();
      } catch (_) {
        tokenService.clearAllTokens();
        window.location.href = ScreenPath.Login;
        return;
      }

      return request(originalRequest);
    }

    return Promise.reject(error.response.data);
  }
);

export { request };
