import { DateTime } from 'luxon';
import { Transform } from 'class-transformer';

export const DynamoTimestampTransformer = (): PropertyDecorator => {
  return (target: any, propertyKey: string | symbol): void => {
    Transform(transformIncomingValue(), { toClassOnly: true })(
      target,
      propertyKey,
    );

    Transform(transformOutgoingValue(), {
      toPlainOnly: true,
    })(target, propertyKey);
  };
};

export const transformIncomingValue =
  () =>
  ({ value }: { value: number }) => {
    return DateTime.fromMillis(value);
  };

export const transformOutgoingValue =
  () =>
  ({ value }: { value: DateTime }) => {
    return (value as DateTime).toMillis();
  };
