const apiBaseUrl = "http://localhost:8080/api";

// These two APIs are not used for axios
export const SIGN_IN = `${apiBaseUrl}/auth/sign-in`;
export const REVOKE_TOKEN = `${apiBaseUrl}/auth/revoke-token`;
export const REFRESH_TOKEN = `${apiBaseUrl}/auth/refresh-token`;

// APIs called by axios
export const CURRENT_USER = `${apiBaseUrl}/user/current`;
export const TEAM_BY_ID = (teamId: string) => `${apiBaseUrl}/team/${teamId}`;
