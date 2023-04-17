import { Transform } from 'class-transformer';

export function DynamoNullableTransformer(): PropertyDecorator {
  return (target: any, propertyKey: string | symbol): void => {
    Transform(({ value }) => (value === 'null' ? null : value), {
      toClassOnly: true,
    })(target, propertyKey);

    Transform(({ value }) => (value === null ? 'null' : value), {
      toPlainOnly: true,
    })(target, propertyKey);
  };
}
