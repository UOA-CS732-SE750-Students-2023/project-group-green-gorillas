export enum TokenType {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export const tokenService = {
  getToken: (tokenType: TokenType) => {
    return localStorage.getItem(tokenType) ?? null;
  },
};
