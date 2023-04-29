import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../database/database.repository';
import { Board } from './board';
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
export class BoardRepository extends DatabaseRepository<Board> {
  constructor(client: DynamoDBClient, config: InternalConfigService) {
    super(
      config.getDatabaseConfig().boardTableName,
      config.getBaseConfig().environment,
      client,
    );
  }

  public save(board: Board): Promise<Board> {
    try {
      return this.putItem(board);
    } catch (error) {
      throw new InternalException('BOARD.FAILED_TO_SAVE', error.message);
    }
  }

  public getById(id: UUID, teamId: UUID): Promise<Board | undefined> {
    try {
      return this.getItem({ id, teamId }, Board);
    } catch (error) {
      throw new InternalException('BOARD.FAILED_TO_GET', error.message);
    }
  }

  public delete(id: UUID, teamId: UUID): Promise<void> {
    try {
      return this.deleteItem({ id, teamId });
    } catch (error) {
      throw new InternalException('BOARD.FAILED_TO_DELETE', error.message);
    }
  }

  public async listByTeamId(teamId: UUID): Promise<Board[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      ExpressionAttributeValues: marshall({
        ':teamId': teamId,
      }),
      KeyConditionExpression: 'teamId = :teamId',
    });

    try {
      const { Items } = await this.client.send(command);

      return Items?.map((item) => plainToClass(Board, unmarshall(item))) ?? [];
    } catch (error) {
      throw new InternalException(
        'BOARD.FAILED_TO_LIST_BY_TEAM_ID',
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
          AttributeName: 'teamId',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'teamId',
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
