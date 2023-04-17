import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../database/database.repository';
import { User } from './user';
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
export class UserRepository extends DatabaseRepository<User> {
  constructor(client: DynamoDBClient, config: InternalConfigService) {
    super(
      config.getDatabaseConfig().userTableName,
      config.getBaseConfig().environment,
      client,
    );
  }

  public async save(user: User): Promise<User> {
    try {
      return this.putItem(user);
    } catch (error) {
      throw new InternalException('USER.FAILED_TO_SAVE', error.message);
    }
  }

  public async getById(
    id: UUID,
    organisationId: UUID,
  ): Promise<User | undefined> {
    try {
      return this.getItem({ id, organisationId }, User);
    } catch (error) {
      throw new InternalException('USER.FAILED_TO_GET', error.message);
    }
  }

  public async listByOrganisationId(organisationId: UUID): Promise<User[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'organisationIdIndex',
      ExpressionAttributeValues: marshall({
        ':organisationId': organisationId,
      }),
      KeyConditionExpression: 'organisationId = :organisationId',
    });

    try {
      const { Items } = await this.client.send(command);

      return Items?.map((item) => plainToClass(User, unmarshall(item))) ?? [];
    } catch (error) {
      console.log(error);
      throw new InternalException(
        'USER.FAILED_TO_LIST_BY_ORGANISATION_ID',
        error.message,
      );
    }
  }

  public async getByEmail(email: string): Promise<User | undefined> {
    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'emailIndex',
      Limit: 1,
      ExpressionAttributeValues: marshall({
        ':email': email,
      }),
      KeyConditionExpression: 'email = :email',
    });

    try {
      const { Items } = await this.client.send(command);

      if (!Items || Items.length === 0) {
        return undefined;
      } else if (Items.length > 1) {
        throw new InternalException(
          'USER.FAILED_TO_GET',
          'More than one user for the email was found',
        );
      }

      const unmarshalledItem = unmarshall(Items[0]);

      return plainToClass(User, unmarshalledItem);
    } catch (error) {
      throw new InternalException('USER.FAILED_TO_GET', error.message);
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
          AttributeName: 'email',
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
          AttributeName: 'id',
          KeyType: 'RANGE',
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'emailIndex',
          KeySchema: [
            {
              AttributeName: 'email',
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
