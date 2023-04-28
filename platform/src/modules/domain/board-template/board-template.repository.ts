import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../database/database.repository';
import { BoardTemplate } from './board-template';
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
export class BoardTemplateRepository extends DatabaseRepository<BoardTemplate> {
  constructor(client: DynamoDBClient, config: InternalConfigService) {
    super(
      config.getDatabaseConfig().boardTemplateTableName,
      config.getBaseConfig().environment,
      client,
    );
  }

  public async getById(
    id: UUID,
    organisationId: UUID,
  ): Promise<BoardTemplate | undefined> {
    try {
      return this.getItem({ id, organisationId }, BoardTemplate);
    } catch (error) {
      throw new InternalException(
        'BOARD_TEMPLATE.FAILED_TO_GET',
        error.message,
      );
    }
  }

  public async save(boardTemplate: BoardTemplate): Promise<BoardTemplate> {
    try {
      return this.putItem(boardTemplate);
    } catch (error) {
      throw new InternalException(
        'BOARD_TEMPLATE.FAILED_TO_SAVE',
        error.message,
      );
    }
  }

  public async listByOrganisationId(
    organisationId: UUID,
  ): Promise<BoardTemplate[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      ExpressionAttributeValues: marshall({
        ':organisationId': organisationId,
      }),
      KeyConditionExpression: 'organisationId = :organisationId',
    });
    try {
      const { Items } = await this.client.send(command);
      return (
        Items?.map((item) => plainToClass(BoardTemplate, unmarshall(item))) ??
        []
      );
    } catch (error) {
      throw new InternalException(
        'BOARD_TEMPLATE.FAILED_TO_LIST_BY_ORGANISATION_ID',
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
