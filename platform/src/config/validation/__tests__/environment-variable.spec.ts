import { EnvironmentVariables } from '../environment-variables';
import { Environment } from '../../types/environment';
import { validate } from '../environment-validator';

describe('EnvironmentVariables', () => {
  it('should validate the environment variables successfully', () => {
    const envVariables: EnvironmentVariables = {
      NODE_ENV: Environment.LOCAL,
      PORT: 3000,
      CLIENT_HOST: 'http://localhost:3000',
      AWS_ACCESS_KEY_ID: 'accessKey',
      AWS_SECRET_ACCESS_KEY: 'secretAccessKey',
      DATABASE_CONNECTION_STRING:
        'postgres://user:password@localhost:5432/database',
      DATABASE_REGION: 'us-west-2',
      DATABASE_ORGANISATION_TABLE_NAME: 'organisation',
      DATABASE_USER_TABLE_NAME: 'user',
      DATABASE_USER_AUTH_TABLE_NAME: 'user_auth',
      DATABASE_TOKEN_TABLE_NAME: 'token',
      DATABASE_TEAM_TABLE_NAME: 'team',
      DATABASE_USER_TEAM_TABLE_NAME: 'user_team',
      DATABASE_BOARD_TABLE_NAME: 'board',
      DATABASE_BOARD_SECTION_TABLE_NAME: 'board_section',
      DATABASE_BOARD_NOTE_TABLE_NAME: 'board_note',
      DATABASE_ACTION_ITEM_TABLE_NAME: 'action_item',
      DATABASE_ACTION_ITEM_ASSIGNEE_TABLE_NAME: 'action_item_assignee',
      DATABASE_BOARD_TEMPLATE_TABLE_NAME: 'board_template',
      DATABASE_TEAM_DASHBOARD_TABLE_NAME: 'team_dashboard',
      DATABASE_BOARD_NOTE_VOTE_TABLE_NAME: 'board_note_vote',
      DATABASE_BOARD_TIME_INVEST_TABLE_NAME: 'board_time_invest',
      TOKEN_SECRET: 'secret',
      TOKEN_ACCESS_TTL: 3600,
      TOKEN_REFRESH_TTL: 86400,
      TOKEN_REFRESH_LONG_TTL: 604800,
      TOKEN_RESET_PASSWORD_TTL: 1800,
      KEY_API: 'api_key',
      KEY_SEND_GRID_API: 'send_grid_api_key',
      REDIS_HOST: 'localhost',
      REDIS_PORT: 6379,
    };

    const validatedConfig = validate(envVariables as any);

    expect(validatedConfig).toEqual(envVariables);
  });
});
