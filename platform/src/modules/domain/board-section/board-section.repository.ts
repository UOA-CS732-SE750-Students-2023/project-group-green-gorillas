import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../database/database.repository';
import { BoardSection } from './board-section';
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
export class BoardSectionRepository extends DatabaseRepository<BoardSection> {
  constructor(client: DynamoDBClient, config: InternalConfigService) {
    super(
      config.getDatabaseConfig().boardSectionTableName,
      config.getBaseConfig().environment,
      client,
    );
  }

  public async listByBoardId(boardId: UUID): Promise<BoardSection[]> {
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
        Items?.map((item) => plainToClass(BoardSection, unmarshall(item))) ?? []
      );
    } catch (error) {
      throw new InternalException(
        'BOARD_SECTION.FAILED_TO_LIST_BY_BOARD_ID',
        error.message,
      );
    }
  }

  public save(boardSection: BoardSection): Promise<BoardSection> {
    try {
      return this.putItem(boardSection);
    } catch (error) {
      throw new InternalException(
        'BOARD_SECTION.FAILED_TO_SAVE',
        error.message,
      );
    }
  }

  public getById(id: UUID, boardId: UUID): Promise<BoardSection | undefined> {
    try {
      return this.getItem({ id, boardId }, BoardSection);
    } catch (error) {
      throw new InternalException('BOARD_SECTION.FAILED_TO_GET', error.message);
    }
  }

  public async delete(id: UUID, boardId: UUID): Promise<void> {
    try {
      await this.deleteItem({ id, boardId });
    } catch (error) {
      throw new InternalException(
        'BOARD_SECTION.FAILED_TO_DELETE',
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
      ],
      KeySchema: [
        {
          AttributeName: 'boardId',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'id',
          KeyType: 'RANGE',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    };
  }
}
