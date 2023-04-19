import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../database/database.repository';
import { Token } from './token';
import {
  CreateTableCommandInput,
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import { InternalConfigService } from '../../global/config/internal-config.service';
import { UUID } from '../../../types/uuid.type';
import { InternalException } from '../../../exceptions/internal-exception';

@Injectable()
export class TokenRepository extends DatabaseRepository<Token> {
  constructor(client: DynamoDBClient, config: InternalConfigService) {
    super(
      config.getDatabaseConfig().tokenTableName,
      config.getBaseConfig().environment,
      client,
    );
  }

  public getByUserId(
    userId: UUID,
    tokenValue: string,
  ): Promise<Token | undefined> {
    try {
      return this.getItem({ userId, value: tokenValue }, Token);
    } catch (error) {
      throw new InternalException('TOKEN.FAILED_TO_GET', error.message);
    }
  }

  public async delete(userId: UUID, tokenValue: string): Promise<void> {
    try {
      await this.deleteItem({ userId, value: tokenValue });
    } catch (error) {
      throw new InternalException('TOKEN.FAILED_TO_DELETE', error.message);
    }
  }

  public async save(token: Token): Promise<Token> {
    try {
      return this.putItem(token);
    } catch (error) {
      throw new InternalException('TOKEN.FAILED_TO_SAVE', error.message);
    }
  }

  // TTL need to configure in actual aws dynamodb
  protected getTableDefinition(): CreateTableCommandInput {
    return {
      TableName: this.tableName,
      AttributeDefinitions: [
        {
          AttributeName: 'userId',
          AttributeType: 'S',
        },
        {
          AttributeName: 'value',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'userId',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'value',
          KeyType: 'RANGE',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    };
  }
}
