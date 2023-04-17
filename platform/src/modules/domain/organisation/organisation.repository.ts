import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../database/database.repository';
import { Organisation } from './organisation';
import {
  CreateTableCommandInput,
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import { InternalConfigService } from '../../global/config/internal-config.service';
import { UUID } from '../../../types/uuid.type';
import { InternalException } from '../../../exceptions/internal-exception';

@Injectable()
export class OrganisationRepository extends DatabaseRepository<Organisation> {
  constructor(client: DynamoDBClient, config: InternalConfigService) {
    super(
      config.getDatabaseConfig().organisationTableName,
      config.getBaseConfig().environment,
      client,
    );
  }

  public async getById(id: UUID): Promise<Organisation | undefined> {
    try {
      return this.getItem({ id }, Organisation);
    } catch (error) {
      throw new InternalException('ORGANISATION.FAILED_TO_GET', error.message);
    }
  }

  public async save(organisation: Organisation): Promise<Organisation> {
    try {
      return this.putItem(organisation);
    } catch (error) {
      throw new InternalException('ORGANISATION.FAILED_TO_SAVE', error.message);
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
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    };
  }
}
