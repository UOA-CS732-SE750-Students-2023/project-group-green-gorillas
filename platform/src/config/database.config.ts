import { IsString, IsOptional } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { validateConfig } from './validation/config-validator';
import { Config } from './types/config';

export class DatabaseConfig {
  @IsString()
  @IsOptional()
  connectionString?: string;

  @IsString()
  @IsOptional()
  region?: string;

  @IsString()
  organisationTableName: string;

  @IsString()
  userTableName: string;

  @IsString()
  userAuthTableName: string;

  @IsString()
  tokenTableName: string;

  @IsString()
  teamTableName: string;

  @IsString()
  userTeamTableName: string;

  @IsString()
  boardTableName: string;

  @IsString()
  boardSectionTableName: string;

  @IsString()
  boardNoteTableName: string;

  @IsString()
  actionItemTableName: string;

  @IsString()
  actionItemAssigneeTableName: string;

  @IsString()
  boardTemplateTableName: string;

  @IsString()
  teamDashboardTableName: string;

  @IsString()
  boardNoteVoteTableName: string;
}

export default registerAs(Config.DATABASE, () =>
  validateConfig(DatabaseConfig, {
    connectionString: process.env.DATABASE_CONNECTION_STRING,
    region: process.env.DATABASE_REGION,
    organisationTableName: process.env.DATABASE_ORGANISATION_TABLE_NAME,
    userTableName: process.env.DATABASE_USER_TABLE_NAME,
    userAuthTableName: process.env.DATABASE_USER_AUTH_TABLE_NAME,
    tokenTableName: process.env.DATABASE_TOKEN_TABLE_NAME,
    teamTableName: process.env.DATABASE_TEAM_TABLE_NAME,
    userTeamTableName: process.env.DATABASE_USER_TEAM_TABLE_NAME,
    boardTableName: process.env.DATABASE_BOARD_TABLE_NAME,
    boardSectionTableName: process.env.DATABASE_BOARD_SECTION_TABLE_NAME,
    boardNoteTableName: process.env.DATABASE_BOARD_NOTE_TABLE_NAME,
    actionItemTableName: process.env.DATABASE_ACTION_ITEM_TABLE_NAME,
    actionItemAssigneeTableName:
      process.env.DATABASE_ACTION_ITEM_ASSIGNEE_TABLE_NAME,
    boardTemplateTableName: process.env.DATABASE_BOARD_TEMPLATE_TABLE_NAME,
    teamDashboardTableName: process.env.DATABASE_TEAM_DASHBOARD_TABLE_NAME,
    boardNoteVoteTableName: process.env.DATABASE_BOARD_NOTE_VOTE_TABLE_NAME,
  }),
);
