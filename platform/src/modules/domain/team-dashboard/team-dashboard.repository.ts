import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../database/database.repository';
import { TeamDashboard } from './team-dashboard';
import {
  CreateTableCommandInput,
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import { InternalConfigService } from '../../global/config/internal-config.service';
import { UUID } from '../../../types/uuid.type';
import { Team } from '../team/team';
import { InternalException } from '../../../exceptions/internal-exception';

@Injectable()
export class TeamDashboardRepository extends DatabaseRepository<TeamDashboard> {
  constructor(client: DynamoDBClient, config: InternalConfigService) {
    super(
      config.getDatabaseConfig().teamDashboardTableName,
      config.getBaseConfig().environment,
      client,
    );
  }

  public getById(
    teamId: UUID,
    organisationId: UUID,
  ): Promise<TeamDashboard | undefined> {
    try {
      return this.getItem({ teamId, organisationId }, TeamDashboard);
    } catch (error) {
      throw new InternalException(
        'TEAM_DASHBOARD.FAILED_TO_GET',
        error.message,
      );
    }
  }

  public async save(teamDashboard: TeamDashboard): Promise<TeamDashboard> {
    try {
      return this.putItem(teamDashboard);
    } catch (error) {
      throw new InternalException(
        'TEAM_DASHBOARD.FAILED_TO_SAVE',
        error.message,
      );
    }
  }

  protected getTableDefinition(): CreateTableCommandInput {
    return {
      TableName: this.tableName,
      AttributeDefinitions: [
        {
          AttributeName: 'organisationId',
          AttributeType: 'S',
        },
        {
          AttributeName: 'teamId',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'organisationId',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'teamId',
          KeyType: 'RANGE',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    };
  }
}
