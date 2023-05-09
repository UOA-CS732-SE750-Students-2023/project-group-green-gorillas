import { Transform } from 'class-transformer';
import { DynamoNullableTransformer } from '../dynamo-nullable-transformer';

describe('DynamoNullableTransformer', () => {
  let target: any;
  let propertyKey: string;

  beforeEach(() => {
    target = {};
    propertyKey = 'myProperty';
  });

  it('should transform "null" string values to null in the class instance', () => {
    const incomingValue = { value: 'null' };
    const transformer = DynamoNullableTransformer();

    transformer(target, propertyKey);
    const classTransform = Transform(
      ({ value }) => (value === 'null' ? null : value),
      {
        toClassOnly: true,
      },
    );

    expect(classTransform).not.toBeNull();
  });

  it('should transform null values to "null" string in the plain object', () => {
    target[propertyKey] = null;
    const transformer = DynamoNullableTransformer();

    transformer(target, propertyKey);
    const plainTransform = Transform(
      ({ value }) => (value === null ? 'null' : value),
      {
        toPlainOnly: true,
      },
    );

    expect(plainTransform).not.toBeNull();
  });
});
