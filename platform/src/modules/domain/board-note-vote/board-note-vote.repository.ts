import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../database/database.repository';
import { BoardNoteVote } from './board-note-vote';
import {
  CreateTableCommandInput,
  DynamoDBClient,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { InternalConfigService } from '../../global/config/internal-config.service';
import { UUID } from '../../../types/uuid.type';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { InternalException } from '../../../exceptions/internal-exception';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BoardNoteVoteRepository extends DatabaseRepository<BoardNoteVote> {
  constructor(client: DynamoDBClient, config: InternalConfigService) {
    super(
      config.getDatabaseConfig().boardNoteVoteTableName,
      config.getBaseConfig().environment,
      client,
    );
  }

  public async listByBoardId(boardId: UUID): Promise<BoardNoteVote[]> {
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
        Items?.map((item) => plainToClass(BoardNoteVote, unmarshall(item))) ??
        []
      );
    } catch (error) {
      throw new InternalException(
        'BOARD_NOTE_VOTE.FAILED_TO_LIST_BOARD_ID',
        error.message,
      );
    }
  }

  public save(boardNoteVote: BoardNoteVote): Promise<BoardNoteVote> {
    try {
      return this.putItem(boardNoteVote);
    } catch (error) {
      throw new InternalException(
        'BOARD_NOTE_VOTE.FAILED_TO_SAVE',
        error.message,
      );
    }
  }

  public getById(
    boardNoteId: UUID,
    userId: UUID,
  ): Promise<BoardNoteVote | undefined> {
    try {
      return this.getItem({ boardNoteId, userId }, BoardNoteVote);
    } catch (error) {
      throw new InternalException(
        'BOARD_NOTE_VOTE.FAILED_TO_GET',
        error.message,
      );
    }
  }

  public delete(boardNoteId: UUID, userId: UUID): Promise<void> {
    try {
      return this.deleteItem({ boardNoteId, userId });
    } catch (error) {
      throw new InternalException(
        'BOARD_NOTE_VOTE.FAILED_TO_DELETE',
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
          AttributeName: 'boardNoteId',
          AttributeType: 'S',
        },
        {
          AttributeName: 'boardId',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        { AttributeName: 'boardNoteId', KeyType: 'HASH' },
        {
          AttributeName: 'userId',
          KeyType: 'RANGE',
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'boardIdIndex',
          KeySchema: [{ AttributeName: 'boardId', KeyType: 'HASH' }],
          Projection: { ProjectionType: 'ALL' },
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    };
  }
}
