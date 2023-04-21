import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../database/database.repository';
import { UserTeam } from './user-team';
import {
  CreateTableCommandInput,
  DynamoDBClient,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { InternalConfigService } from '../../global/config/internal-config.service';
import { UUID } from '../../../types/uuid.type';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { plainToClass } from 'class-transformer';
import { InternalException } from '../../../exceptions/internal-exception';

@Injectable()
export class UserTeamRepository extends DatabaseRepository<UserTeam> {
  constructor(client: DynamoDBClient, config: InternalConfigService) {
    super(
      config.getDatabaseConfig().userTeamTableName,
      config.getBaseConfig().environment,
      client,
    );
  }

  public async getById(
    userId: UUID,
    teamId: UUID,
  ): Promise<UserTeam | undefined> {
    try {
      return this.getItem({ userId, teamId }, UserTeam);
    } catch (error) {
      throw new InternalException('USER_TEAM.FAILED_TO_GET', error.message);
    }
  }

  public async save(userTeam: UserTeam): Promise<UserTeam> {
    try {
      return this.putItem(userTeam);
    } catch (error) {
      throw new InternalException('USER_TEAM.FAILED_TO_SAVE', error.message);
    }
  }

  public async delete(userId: UUID, teamId: UUID): Promise<void> {
    try {
      await this.deleteItem({ userId, teamId });
    } catch (error) {
      throw new InternalException('USER_TEAM.FAILED_TO_DELETE', error.message);
    }
  }

  public async listByUserId(userId: UUID): Promise<UserTeam[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      ExpressionAttributeValues: marshall({
        ':userId': userId,
      }),
      KeyConditionExpression: 'userId = :userId',
    });

    try {
      const { Items } = await this.client.send(command);

      return (
        Items?.map((item) => plainToClass(UserTeam, unmarshall(item))) ?? []
      );
    } catch (error) {
      throw new InternalException(
        'USER_TEAM.FAILED_TO_LIST_BY_USER_ID',
        error.message,
      );
    }
  }

  public async listByTeamId(
    teamId: UUID,
    organisationId: UUID,
  ): Promise<UserTeam[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'organisationIdTeamIdIndex',
      ExpressionAttributeValues: marshall({
        ':teamId': teamId,
        ':organisationId': organisationId,
      }),
      KeyConditionExpression:
        'teamId = :teamId AND organisationId = :organisationId',
    });

    try {
      const { Items } = await this.client.send(command);

      return (
        Items?.map((item) => plainToClass(UserTeam, unmarshall(item))) ?? []
      );
    } catch (error) {
      throw new InternalException(
        'USER_TEAM.FAILED_TO_LIST_BY_TEAM_ID',
        error.message,
      );
    }
  }

  protected getTableDefinition(): CreateTableCommandInput {
    return {
      TableName: this.tableName,
      AttributeDefinitions: [
        {
          AttributeName: 'userId',
          AttributeType: 'S',
        },
        {
          AttributeName: 'teamId',
          AttributeType: 'S',
        },
        {
          AttributeName: 'organisationId',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'userId',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'teamId',
          KeyType: 'RANGE',
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'organisationIdTeamIdIndex',
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
          Projection: { ProjectionType: 'ALL' },
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    };
  }
}
