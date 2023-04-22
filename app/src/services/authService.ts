import {
  REFRESH_TOKEN,
  REQUEST_RESET_PASSWORD,
  RESET_PASSWORD,
  REVOKE_TOKEN,
  SIGN_IN,
  VERIFY_RESET_PASSWORD_TOKEN,
} from "../api/api";
import { tokenService, TokenType } from "./tokenService";

export const authService = {
  signIn: async (
    email: string,
    password: string,
    isRememberMe: boolean
  ): Promise<void> => {
    const rawData = await fetch(SIGN_IN, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        isRememberMe,
      }),
    });

    if (!rawData || rawData?.status !== 201) {
      throw new Error("Credentials are incorrect.");
    }

    const { accessToken, refreshToken } = await rawData.json();

    tokenService.setToken(TokenType.ACCESS_TOKEN, accessToken.value);
    tokenService.setToken(TokenType.REFRESH_TOKEN, refreshToken.value);
  },
  signOut: async (): Promise<void> => {
    const refreshToken = tokenService.getToken(TokenType.REFRESH_TOKEN);
    const accessToken = tokenService.getToken(TokenType.ACCESS_TOKEN);

    if (!refreshToken || !accessToken) {
      tokenService.clearAllTokens();
      return;
    }

    try {
      await fetch(REVOKE_TOKEN, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({
          token: refreshToken,
        }),
      });
    } catch (_) {
      // Ignore failing to revoke token
    }

    tokenService.clearAllTokens();
  },
  verifyResetPasswordToken: async (token: string): Promise<void> => {
    const rawData = await fetch(VERIFY_RESET_PASSWORD_TOKEN(token), {
      method: "GET",
    });

    if (rawData?.status !== 200) {
      throw new Error("Invalid Token");
    }
  },
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    const rawData = await fetch(RESET_PASSWORD, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        newPassword,
      }),
    });

    if (rawData.status !== 201) {
      throw new Error("Failed to reset password");
    }
  },
  requestResetPassword: async (email: string): Promise<void> => {
    const rawData = await fetch(REQUEST_RESET_PASSWORD, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (rawData?.status !== 201) {
      throw new Error("Failed to request reset password");
    }
  },
  refreshToken: async (): Promise<void> => {
    const refreshTokenFromStorage = tokenService.getToken(
      TokenType.REFRESH_TOKEN
    );

    if (!refreshTokenFromStorage) return;

    const rawData = await fetch(REFRESH_TOKEN, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: refreshTokenFromStorage,
      }),
    });

    if (rawData?.status !== 201) {
      throw new Error("Failed to refresh token");
    }

    const { accessToken, refreshToken } = await rawData.json();

    tokenService.setToken(TokenType.ACCESS_TOKEN, accessToken.value);
    tokenService.setToken(TokenType.REFRESH_TOKEN, refreshToken.value);
  },
};
