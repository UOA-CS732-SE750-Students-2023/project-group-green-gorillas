import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../database/database.repository';
import { Team } from './team';
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
export class TeamRepository extends DatabaseRepository<Team> {
  constructor(client: DynamoDBClient, config: InternalConfigService) {
    super(
      config.getDatabaseConfig().teamTableName,
      config.getBaseConfig().environment,
      client,
    );
  }

  public async listByOrganisationId(organisationId: UUID): Promise<Team[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      ExpressionAttributeValues: marshall({
        ':organisationId': organisationId,
      }),
      KeyConditionExpression: 'organisationId = :organisationId',
    });

    try {
      const { Items } = await this.client.send(command);

      return Items?.map((item) => plainToClass(Team, unmarshall(item))) ?? [];
    } catch (error) {
      throw new InternalException(
        'TEAM.FAILED_TO_LIST_BY_ORGANISATION_ID',
        error.message,
      );
    }
  }

  public getById(id: UUID, organisationId: UUID): Promise<Team | undefined> {
    try {
      return this.getItem({ id, organisationId }, Team);
    } catch (error) {
      throw new InternalException('TEAM.FAILED_TO_GET', error.message);
    }
  }

  public async save(team: Team): Promise<Team> {
    try {
      return this.putItem(team);
    } catch (error) {
      throw new InternalException('TEAM.FAILED_TO_SAVE', error.message);
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
      BillingMode: 'PAY_PER_REQUEST',
    };
  }
}
