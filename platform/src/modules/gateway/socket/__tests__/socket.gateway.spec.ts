import { SocketGateway } from '../socket.gateway';
import { SocketService } from '../socket.service';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

describe('SocketGateway', () => {
  let socketGateway: any;
  let socketService: SocketService;
  let logger: Logger;
  let server: Server;
  let client: Socket;

  beforeEach(() => {
    socketService = {
      verifySocketAuthentication: jest.fn(),
      verifyJoinRoomEvent: jest.fn(),
      getRoomUsers: jest.fn(),
    } as any;
    logger = {
      log: jest.fn(),
      error: jest.fn(),
    } as any;
    server = {
      sockets: {
        in: jest.fn().mockReturnThis(),
        emit: jest.fn(),
      },
    } as any;
    client = {
      data: {},
      handshake: { auth: { token: 'token' } },
      emit: jest.fn(),
      disconnect: jest.fn(),
    } as any;

    socketGateway = new SocketGateway(socketService);
    socketGateway.webSocketServer = server;
    socketGateway.logger = logger;
  });

  describe('handleConnection', () => {
    it('should authenticate the client and log the connection', async () => {
      const user = { id: 'userId' };
      (socketService.verifySocketAuthentication as jest.Mock).mockResolvedValue(
        user,
      );

      await socketGateway.handleConnection(client);

      expect(client.data.user).toBe(user);
      expect(client.emit).toHaveBeenCalledWith(
        'authentication',
        JSON.stringify({ success: true }),
      );
      expect(logger.log).toHaveBeenCalledWith('userId is connected');
    });

    it('should disconnect the client if the authentication fails', async () => {
      (socketService.verifySocketAuthentication as jest.Mock).mockRejectedValue(
        new Error('Invalid token'),
      );

      await socketGateway.handleConnection(client);

      expect(client.emit).toHaveBeenCalledWith(
        'authentication',
        JSON.stringify({ success: false }),
      );
      expect(client.disconnect).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith(new Error('Invalid token'));
    });
  });
});
