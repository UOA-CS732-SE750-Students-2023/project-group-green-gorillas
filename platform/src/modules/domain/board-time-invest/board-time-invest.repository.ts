import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../database/database.repository';
import { BoardTimeInvest } from './board-time-invest';
import {
  CreateTableCommandInput,
  DynamoDBClient,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { InternalConfigService } from '../../global/config/internal-config.service';
import { InternalException } from '../../../exceptions/internal-exception';
import { UUID } from '../../../types/uuid.type';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BoardTimeInvestRepository extends DatabaseRepository<BoardTimeInvest> {
  constructor(client: DynamoDBClient, config: InternalConfigService) {
    super(
      config.getDatabaseConfig().boardTimeInvestTableName,
      config.getBaseConfig().environment,
      client,
    );
  }

  public async save(
    boardTimeInvest: BoardTimeInvest,
  ): Promise<BoardTimeInvest> {
    try {
      return this.putItem(boardTimeInvest);
    } catch (error) {
      throw new InternalException(
        'BOARD_TIME_INVEST.FAILED_TO_SAVE',
        error.message,
      );
    }
  }

  public async listByTeamId(teamId: UUID): Promise<BoardTimeInvest[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'teamIdIndex',
      ExpressionAttributeValues: marshall({
        ':teamId': teamId,
      }),
      KeyConditionExpression: 'teamId = :teamId',
    });

    try {
      const { Items } = await this.client.send(command);

      return (
        Items?.map((item) => plainToClass(BoardTimeInvest, unmarshall(item))) ??
        []
      );
    } catch (error) {
      throw new InternalException(
        'BOARD_TIME_INVEST.FAILED_TO_LIST_BY_TEAM_ID',
        error.message,
      );
    }
  }

  public async listByBoardId(boardId: UUID): Promise<BoardTimeInvest[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      ExpressionAttributeValues: marshall({
        ':boardId': boardId,
      }),
      KeyConditionExpression: 'boardId = :boardId',
    });

    try {
      const { Items } = await this.client.send(command);

      return (
        Items?.map((item) => plainToClass(BoardTimeInvest, unmarshall(item))) ??
        []
      );
    } catch (error) {
      throw new InternalException(
        'BOARD_TIME_INVEST.FAILED_TO_LIST_BY_BOARD_ID',
        error.message,
      );
    }
  }

  protected getTableDefinition(): CreateTableCommandInput {
    return {
      TableName: this.tableName,
      AttributeDefinitions: [
        {
          AttributeName: 'boardId',
          AttributeType: 'S',
        },
        {
          AttributeName: 'userId',
          AttributeType: 'S',
        },
        {
          AttributeName: 'teamId',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'boardId',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'userId',
          KeyType: 'RANGE',
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'teamIdIndex',
          KeySchema: [
            {
              AttributeName: 'teamId',
              KeyType: 'HASH',
            },
          ],
          Projection: { ProjectionType: 'ALL' },
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    };
  }
}
