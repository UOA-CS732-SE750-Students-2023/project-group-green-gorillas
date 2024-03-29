export const baseUrl = "http://localhost:8080";
const apiBaseUrl = `${baseUrl}/api`;

// These two APIs are not used for axios
export const SIGN_IN = `${apiBaseUrl}/auth/sign-in`;
export const REVOKE_TOKEN = `${apiBaseUrl}/auth/revoke-token`;
export const REFRESH_TOKEN = `${apiBaseUrl}/auth/refresh-token`;
export const REQUEST_RESET_PASSWORD = `${apiBaseUrl}/auth/request-reset-password`;
export const VERIFY_RESET_PASSWORD_TOKEN = (token: string) =>
  `${apiBaseUrl}/auth/verify-reset-password-token/${token}`;
export const RESET_PASSWORD = `${apiBaseUrl}/auth/reset-password`;

// APIs called by axios
export const CURRENT_USER =  `${apiBaseUrl}/user/current`;

export const CHANGE_PASSWORD = `${apiBaseUrl}/auth/current/change-password`;

export const UPDATE_COMPANY_NAME = `${apiBaseUrl}/organisation/update-name`;

export const TEAM_BY_ID = (teamId: string) => `${apiBaseUrl}/team/${teamId}`;
export const INSIGHT_BY_ID = (teamId: string) =>
  `${apiBaseUrl}/team/insight/${teamId}`;
export const RETROLIST_BY_ID = (teamId: string) =>
  `${apiBaseUrl}/team/retro-history/${teamId}`;
export const GET_RETRO = (retroId: string, teamId: string) =>
  `${apiBaseUrl}/retrospective/${retroId}/team/${teamId}`;
export const INPROGRESS_RETRO = (teamId: string) =>
  `${apiBaseUrl}/team/in-progress-retro/${teamId}`;
export const RATE_BY_ID = (teamId: string) => `${apiBaseUrl}/team/board-time-invest/${teamId}`;

export const ACTIONITEMS_LIST_BY_ID = (teamId: string) =>
  `${apiBaseUrl}/action-item/list-outstanding/${teamId}`;
export const DELETE_ACTIONITEMS_BY_ID = (teamId: string) =>
  `${apiBaseUrl}/action-item/${teamId}`;

export const UPDATE_ACTIONITEMS_BY_ID = `${apiBaseUrl}/action-item/update-status`;
export const TEMPLATE = () => `${apiBaseUrl}/retrospective/template/list`;
export const TEAM_LIST = () => `${apiBaseUrl}/team/list`;
export const USER_LIST = () => `${apiBaseUrl}/user/list`;
export const DISABLE_USER = (userId: string) => `${apiBaseUrl}/user/update-active/${userId}`;
export const UPDATE_USER = (userId: string) => `${apiBaseUrl}/user/${userId}`;
export const CREATE_USER = () => `${apiBaseUrl}/user`;
export const UPDATE_TEAM = (teamId: string) => `${apiBaseUrl}/team/${teamId}`;
export const CREATE_TEAM = () => `${apiBaseUrl}/team`;
export const ADD_TEAM_USER = () => `${apiBaseUrl}/team/add-team-user`;
export const UPDATE_TEAM_USER = () => `${apiBaseUrl}/team/update-team-user`;
export const DISABLE_TEAM = (teamId: string) => `${apiBaseUrl}/team/update-active/${teamId}`;
export const DELETE_TEAM_USER = () => `${apiBaseUrl}/team/remove-team-user`;


export const TEAM_ROLE_BY_ID = (teamId: string) =>
  `${apiBaseUrl}/team/team-role/${teamId}`;

export const ADD_SECTION = `${apiBaseUrl}/retrospective/add-section`;
export const DELETE_SECTION = (boardSectionId: string, boardId: string) =>
  `${apiBaseUrl}/retrospective/delete-section/${boardSectionId}/board/${boardId}`;
export const UPDATE_SECTION_NAME = `${apiBaseUrl}/retrospective/update-section-name`;
export const UPDATE_SECTION_DESC = `${apiBaseUrl}/retrospective/update-section-description`;

export const ADD_RETRO_NOTE = `${apiBaseUrl}/retrospective/add-note`;
export const DELETE_RETRO_NOTE = (boardNoteId: string) =>
  `${apiBaseUrl}/retrospective/delete-note/${boardNoteId}`;
export const UPDATE_RETRO_NOTE = `${apiBaseUrl}/retrospective/update-note`;

export const UPDATE_RETRO_NOTE_GROUP = `${apiBaseUrl}/retrospective/update-note-group`;
export const CREATERETRO = `${apiBaseUrl}/retrospective/create`;
export const UPDATE_RETRO_NAME = `${apiBaseUrl}/retrospective/update-name`;

export const ASSIGN_NOTE_GROUP = `${apiBaseUrl}/retrospective/assign-note-group`;
export const UNASSIGN_NOTE_GROUP = `${apiBaseUrl}/retrospective/un-assign-note-group`;
export const VOTE_NOTE = `${apiBaseUrl}/retrospective/vote-note`;
export const UNVOTE_NOTE = `${apiBaseUrl}/retrospective/un-vote-note`;
export const ADD_ACTION_ITEM = `${apiBaseUrl}/action-item`;
export const DELETE_ACTION_ITEM = (id: string) =>
  `${apiBaseUrl}/action-item/${id}`;
export const UPDATE_ACTION_ITEM_NOTE = `${apiBaseUrl}/action-item/update-note`;
export const MOVE_RETRO_NEXT_STAGE = `${apiBaseUrl}/retrospective/move-next-stage`;
export const ISRETROACTIVE = (teamId: string) =>
  `${apiBaseUrl}/team/has-in-progress-retro/${teamId}`;
export const DELETE_RETRO = (retroId: string, teamId: string) =>
  `${apiBaseUrl}/retrospective/${retroId}/team/${teamId}`;
export const SET_RETRO_SESSION_PAYLOAD = `${apiBaseUrl}/retrospective/set-retro-session-payload`;
export const UPDATE_USER_PROFILE = `${apiBaseUrl}/auth/reset-password`;
export const ASSIGN_USER_TO_ACTION_ITEM = `${apiBaseUrl}/action-item/assign-user`;
export const UNASSIGN_USER_TO_ACTION_ITEM = `${apiBaseUrl}/action-item/un-assign-user`;
export const ADD_BOARD_TIME_INVEST_RATE = `${apiBaseUrl}/retrospective/add-board-time-invest-rate`;
