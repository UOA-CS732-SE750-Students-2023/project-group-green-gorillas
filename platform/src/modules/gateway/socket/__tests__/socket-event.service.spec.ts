import { SocketGateway } from '../socket.gateway';
import { SocketEventService } from '../socket-event.service';

describe('SocketEventService', () => {
  const roomId = 'test-room';
  const event = 'test-event';
  const message = {};
  const messageToSend = JSON.stringify(message);

  let socketEventService: SocketEventService;

  const mock = jest.fn();

  beforeEach(() => {
    socketEventService = new SocketEventService({
      webSocketServer: {
        to: mock.mockReturnThis(),
        emit: mock.mockReturnThis(),
      },
    } as any);

    jest.clearAllMocks();
  });

  it('should broadcast message to room', () => {
    socketEventService.broadcastRoom(roomId, event, message);
    expect(mock).toHaveBeenCalledTimes(2);
  });
});
