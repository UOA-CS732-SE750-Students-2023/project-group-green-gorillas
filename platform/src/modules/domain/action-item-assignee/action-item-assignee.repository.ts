import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../database/database.repository';
import { ActionItemAssignee } from './action-item-assignee';
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
export class ActionItemAssigneeRepository extends DatabaseRepository<ActionItemAssignee> {
  constructor(client: DynamoDBClient, config: InternalConfigService) {
    super(
      config.getDatabaseConfig().actionItemAssigneeTableName,
      config.getBaseConfig().environment,
      client,
    );
  }

  public async save(
    actionItemAssignee: ActionItemAssignee,
  ): Promise<ActionItemAssignee> {
    try {
      return this.putItem(actionItemAssignee);
    } catch (error) {
      throw new InternalException(
        'ACTION_ITEM_ASSIGNEE.FAILED_TO_SAVE',
        error.message,
      );
    }
  }

  public async delete(actionItemId: UUID, userId: UUID): Promise<void> {
    try {
      await this.deleteItem({ actionItemId, userId });
    } catch (error) {
      throw new InternalException(
        'ACTION_ITEM_ASSIGNEE.FAILED_TO_DELETE',
        error.message,
      );
    }
  }

  public async listByActionItemId(
    actionItemId: UUID,
  ): Promise<ActionItemAssignee[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      ExpressionAttributeValues: marshall({
        ':actionItemId': actionItemId,
      }),
      KeyConditionExpression: 'actionItemId = :actionItemId',
    });

    try {
      const { Items } = await this.client.send(command);

      return (
        Items?.map((item) =>
          plainToClass(ActionItemAssignee, unmarshall(item)),
        ) ?? []
      );
    } catch (error) {
      throw new InternalException(
        'ACTION_ITEM_ASSIGNEE.FAILED_TO_LIST_BY_ACTION_ITEM_ID',
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
          AttributeName: 'actionItemId',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'actionItemId',
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
