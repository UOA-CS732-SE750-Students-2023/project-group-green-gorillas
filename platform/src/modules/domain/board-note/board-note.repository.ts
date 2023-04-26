import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../database/database.repository';
import { BoardNote } from './board-note';
import {
  CreateTableCommandInput,
  DynamoDBClient,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { InternalConfigService } from '../../global/config/internal-config.service';
import { UUID } from '../../../types/uuid.type';
import { InternalException } from '../../../exceptions/internal-exception';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BoardNoteRepository extends DatabaseRepository<BoardNote> {
  constructor(client: DynamoDBClient, config: InternalConfigService) {
    super(
      config.getDatabaseConfig().boardNoteTableName,
      config.getBaseConfig().environment,
      client,
    );
  }

  public async getById(
    id: UUID,
    boardSectionId: UUID,
  ): Promise<BoardNote | undefined> {
    try {
      return this.getItem({ id, boardSectionId }, BoardNote);
    } catch (error) {
      throw new InternalException('BOARD_NOTE.FAILED_TO_GET', error.message);
    }
  }

  public async save(boardNote: BoardNote): Promise<BoardNote> {
    try {
      return this.putItem(boardNote);
    } catch (error) {
      throw new InternalException('BOARD_NOTE.FAILED_TO_SAVE', error.message);
    }
  }

  public async delete(id: UUID, boardSectionId): Promise<void> {
    try {
      await this.deleteItem({ id, boardSectionId });
    } catch (error) {
      throw new InternalException('BOARD_NOTE.FAILED_TO_DELETE', error.message);
    }
  }

  public async listByBoardId(boardId: UUID): Promise<BoardNote[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'boardIdIndex',
      ExpressionAttributeValues: marshall({
        ':boardId': boardId,
      }),
      KeyConditionExpression: 'boardId = :boardId',
    });

    try {
      const { Items } = await this.client.send(command);

      return (
        Items?.map((item) => plainToClass(BoardNote, unmarshall(item))) ?? []
      );
    } catch (error) {
      throw new InternalException(
        'BOARD_NOTE.FAILED_TO_LIST_BY_BOARD_ID',
        error.message,
      );
    }
  }

  public async listByBoardSectionId(
    boardSectionId: UUID,
  ): Promise<BoardNote[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      ExpressionAttributeValues: marshall({
        ':boardSectionId': boardSectionId,
      }),
      KeyConditionExpression: 'boardSectionId = :boardSectionId',
    });

    try {
      const { Items } = await this.client.send(command);

      return (
        Items?.map((item) => plainToClass(BoardNote, unmarshall(item))) ?? []
      );
    } catch (error) {
      throw new InternalException(
        'BOARD_NOTE.FAILED_TO_LIST_BOARD_SECTION_ID',
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
          AttributeName: 'boardSectionId',
          AttributeType: 'S',
        },
        {
          AttributeName: 'boardId',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'boardSectionId',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'id',
          KeyType: 'RANGE',
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'boardIdIndex',
          KeySchema: [
            {
              AttributeName: 'boardId',
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
