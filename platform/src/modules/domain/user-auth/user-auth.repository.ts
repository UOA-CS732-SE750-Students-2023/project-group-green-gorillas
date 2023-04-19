import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../database/database.repository';
import { UserAuth } from './user-auth';
import {
  CreateTableCommandInput,
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import { InternalConfigService } from '../../global/config/internal-config.service';
import { InternalException } from '../../../exceptions/internal-exception';
import { UUID } from '../../../types/uuid.type';

@Injectable()
export class UserAuthRepository extends DatabaseRepository<UserAuth> {
  constructor(client: DynamoDBClient, config: InternalConfigService) {
    super(
      config.getDatabaseConfig().userAuthTableName,
      config.getBaseConfig().environment,
      client,
    );
  }

  public async save(userAuth: UserAuth): Promise<UserAuth> {
    try {
      return this.putItem(userAuth);
    } catch (error) {
      throw new InternalException('USER_AUTH.FAILED_TO_SAVE', error.message);
    }
  }

  public async getByUserId(
    userId: UUID,
    organisationId: UUID,
  ): Promise<UserAuth | undefined> {
    try {
      return this.getItem({ userId, organisationId }, UserAuth);
    } catch (error) {
      throw new InternalException('USER_AUTH.FAILED_TO_GET', error.message);
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
          AttributeName: 'organisationId',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'organisationId',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'userId',
          KeyType: 'RANGE',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    };
  }
}
