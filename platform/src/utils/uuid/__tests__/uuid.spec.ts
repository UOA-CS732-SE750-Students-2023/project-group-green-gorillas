import { uuid } from '../uuid';

describe('uuid', () => {
  it('returns a string', () => {
    const result = uuid();
    expect(typeof result).toBe('string');
  });

  it('returns a UUID v4 string', () => {
    const result = uuid();
    const regex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    expect(regex.test(result)).toBe(true);
  });
});
