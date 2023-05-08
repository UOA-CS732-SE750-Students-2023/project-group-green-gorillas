import { DateTime } from 'luxon';
import {
  transformIncomingValue,
  transformOutgoingValue,
} from '../dynamo-date-transformer';

describe('DynamoTimestampTransformer', () => {
  describe('transformIncomingValue', () => {
    it('should transform the incoming value to a Luxon DateTime object', () => {
      const value = 1620449429000;
      const transformedValue = DateTime.fromMillis(value);

      expect(transformIncomingValue()({ value })).toEqual(transformedValue);
    });
  });

  describe('transformOutgoingValue', () => {
    it('should transform the outgoing value to a Unix timestamp number', () => {
      const value = DateTime.fromMillis(1620449429000);
      const transformedValue = value.toMillis();

      expect(transformOutgoingValue()({ value })).toEqual(transformedValue);
    });
  });
});
