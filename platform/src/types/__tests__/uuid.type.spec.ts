import { UUID } from '../uuid.type';

describe('UUID', () => {
  it('should be a string', () => {
    const uuid: UUID = '123e4567-e89b-12d3-a456-426655440000';
    expect(typeof uuid).toBe('string');
  });
});
