import { Logger, OnModuleInit } from '@nestjs/common';
import {
  CreateTableCommand,
  CreateTableCommandInput,
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  ListTablesCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import {
  ClassConstructor,
  classToPlain,
  plainToClass,
} from 'class-transformer';
import { Environment } from '../../../config/types/environment';

export abstract class DatabaseRepository<T> implements OnModuleInit {
  protected logger: Logger = new Logger(DatabaseRepository.name);
  protected tableName: string;

  protected constructor(
    protected readonly baseTableName: string,
    protected readonly environment: Environment,
    protected readonly client: DynamoDBClient,
  ) {
    this.tableName = `${environment}-${baseTableName}`;
  }

  protected abstract getTableDefinition(): CreateTableCommandInput;

  public onModuleInit(): Promise<void> {
    return this.createTableIfNotExists(this.getTableDefinition());
  }

  protected async putItem(data: T): Promise<T> {
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall(classToPlain(data), {
        removeUndefinedValues: true,
      }),
    });

    await this.client.send(command);

    return data;
  }

  protected async deleteItem(key: Record<string, unknown>): Promise<void> {
    const command = new DeleteItemCommand({
      TableName: this.tableName,
      Key: marshall(key),
    });

    await this.client.send(command);
  }

  protected async getItem(
    key: Record<string, unknown>,
    classConstructor: ClassConstructor<T>,
  ): Promise<T | undefined> {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: marshall(key),
    });

    const { Item } = await this.client.send(command);

    if (!Item) {
      return undefined;
    }

    const unmarshalledItem = unmarshall(Item);

    return plainToClass(classConstructor, unmarshalledItem);
  }

  private async createTableIfNotExists(
    tableDefinition: CreateTableCommandInput,
  ): Promise<void> {
    this.logger.log(
      `Creating table if it does not exist (tableName: ${this.tableName})`,
    );

    if (tableDefinition.TableName !== this.tableName) {
      throw new Error(
        `Table name on definition does not match repository (tableName: ${this.tableName})`,
      );
    }

    const tableExists = await this.doesTableExist();

    if (tableExists) {
      this.logger.log(
        `Table already exists, no need to create. (tableName: ${this.tableName})`,
      );

      return;
    }

    this.logger.log(
      `Table does not exist, creating... (tableName: ${this.tableName})`,
    );

    const command = new CreateTableCommand(tableDefinition);
    await this.client.send(command);
  }

  private async doesTableExist(): Promise<boolean> {
    this.logger.log(`Checking if table exists (tableName: ${this.tableName})`);
    const tables = await this.client.send(new ListTablesCommand({}));

    return (tables.TableNames || []).some((name) => name === this.tableName);
  }
}
