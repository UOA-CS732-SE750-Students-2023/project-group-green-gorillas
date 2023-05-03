import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../database/database.repository';
import { ActionItem, ActionItemStatus } from './action-item';
import {
  CreateTableCommandInput,
  DynamoDBClient,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { InternalConfigService } from '../../global/config/internal-config.service';
import { InternalException } from '../../../exceptions/internal-exception';
import { plainToClass } from 'class-transformer';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { UUID } from '../../../types/uuid.type';

@Injectable()
export class ActionItemRepository extends DatabaseRepository<ActionItem> {
  constructor(client: DynamoDBClient, config: InternalConfigService) {
    super(
      config.getDatabaseConfig().actionItemTableName,
      config.getBaseConfig().environment,
      client,
    );
  }

  public async delete(id: UUID): Promise<void> {
    try {
      await this.deleteItem({ id });
    } catch (error) {
      throw new InternalException(
        'ACTION_ITEM.FAILED_TO_DELETE',
        error.message,
      );
    }
  }

  public async getById(id: UUID): Promise<ActionItem | undefined> {
    try {
      return this.getItem({ id }, ActionItem);
    } catch (error) {
      throw new InternalException('ACTION_ITEM.FAILED_TO_GET', error.message);
    }
  }

  public async save(actionItem: ActionItem): Promise<ActionItem> {
    try {
      return this.putItem(actionItem);
    } catch (error) {
      throw new InternalException('ACTION_ITEM.FAILED_TO_SAVE', error.message);
    }
  }

  public async listByTeamId(teamId: UUID): Promise<ActionItem[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'teamBoardIdIndex',
      ExpressionAttributeValues: marshall({
        ':teamId': teamId,
      }),
      KeyConditionExpression: 'teamId = :teamId',
    });

    try {
      const { Items } = await this.client.send(command);

      return (
        Items?.map((item) => plainToClass(ActionItem, unmarshall(item))) ?? []
      );
    } catch (error) {
      throw new InternalException(
        'ACTION_ITEM.FAILED_TO_LIST_BY_TEAM_ID',
        error.message,
      );
    }
  }

  public async listByStatus(
    teamId: UUID,
    status: ActionItemStatus,
  ): Promise<ActionItem[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'teamStatusIndex',
      ExpressionAttributeValues: marshall({
        ':teamId': teamId,
        ':status': status,
      }),
      KeyConditionExpression: `teamId = :teamId AND #action_item_status = :status`,
      ExpressionAttributeNames: { '#action_item_status': 'status' },
    });

    try {
      const { Items } = await this.client.send(command);

      return (
        Items?.map((item) => plainToClass(ActionItem, unmarshall(item))) ?? []
      );
    } catch (error) {
      throw new InternalException(
        'ACTION_ITEM.FAILED_TO_LIST_BY_STATUS',
        error.message,
      );
    }
  }

  public async listByBoardId(
    teamId: UUID,
    boardId: UUID,
  ): Promise<ActionItem[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'teamBoardIdIndex',
      ExpressionAttributeValues: marshall({
        ':teamId': teamId,
        ':boardId': boardId,
      }),
      KeyConditionExpression: 'teamId = :teamId AND boardId = :boardId',
    });

    try {
      const { Items } = await this.client.send(command);

      return (
        Items?.map((item) => plainToClass(ActionItem, unmarshall(item))) ?? []
      );
    } catch (error) {
      throw new InternalException(
        'ACTION_ITEM.FAILED_TO_LIST_BY_BOARD_ID',
        error.message,
      );
    }
  }

  protected getTableDefinition(): CreateTableCommandInput {
    return {
      TableName: this.tableName,
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'boardId',
          AttributeType: 'S',
        },
        {
          AttributeName: 'teamId',
          AttributeType: 'S',
        },
        {
          AttributeName: 'status',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'teamBoardIdIndex',
          KeySchema: [
            {
              AttributeName: 'teamId',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'boardId',
              KeyType: 'RANGE',
            },
          ],
          Projection: { ProjectionType: 'ALL' },
        },
        {
          IndexName: 'teamStatusIndex',
          KeySchema: [
            {
              AttributeName: 'teamId',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'status',
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
