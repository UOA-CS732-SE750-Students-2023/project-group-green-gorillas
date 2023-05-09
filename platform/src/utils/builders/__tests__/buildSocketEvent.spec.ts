import { buildSocketEvent, SocketEventOperation } from '../buildSocketEvent';

describe('buildSocketEvent', () => {
  it('should create a socket event object', () => {
    const type = SocketEventOperation.CREATE;
    const data = { name: 'John Doe', age: 25 };
    const event = buildSocketEvent(type, data);

    expect(event).toEqual({
      type: SocketEventOperation.CREATE,
      data: { name: 'John Doe', age: 25 },
    });
  });
});
