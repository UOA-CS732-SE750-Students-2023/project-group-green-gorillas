import { Server } from 'socket.io';
import { SocketService } from '../socket.service';

describe('SocketService', () => {
  let socketService: any;
  let tokenService: any;
  let organisationService: any;
  let boardService: any;
  let userTeamService: any;

  beforeEach(() => {
    tokenService = {
      verify: jest.fn(),
    };

    organisationService = {
      getByIdOrThrow: jest.fn(),
    };

    boardService = {
      getByIdOrThrow: jest.fn(),
    };

    userTeamService = {
      listByUserId: jest.fn(),
    };

    socketService = new SocketService(
      tokenService,
      organisationService,
      boardService,
      userTeamService,
    );
  });

  describe('getRoomUsers', () => {
    it('should return an array of unique users in the room', async () => {
      const socket1 = { data: { user: { id: 'user1' } } };
      const socket2 = { data: { user: { id: 'user2' } } };
      const socket3 = { data: { user: { id: 'user1' } } }; // duplicate user

      const fetchSocketsMock = jest
        .fn()
        .mockResolvedValue([socket1, socket2, socket3]);
      const webSocketServerMock = {
        sockets: { adapter: { fetchSockets: fetchSocketsMock } },
      } as unknown as Server;

      const result = await socketService.getRoomUsers(
        webSocketServerMock,
        'room1',
      );

      expect(result).toHaveLength(2);
      expect(result).toContainEqual({ id: 'user1' });
      expect(result).toContainEqual({ id: 'user2' });
    });
  });

  describe('verifySocketAuthentication', () => {
    it('should return the user and organisation if the token is valid and the user and organisation are active', async () => {
      const user = { id: 'user1', active: true, organisationId: 'org1' };
      const organisation = { active: true };

      tokenService.verify.mockResolvedValue(user);
      organisationService.getByIdOrThrow.mockResolvedValue(organisation);

      const result = await socketService.verifySocketAuthentication('token1');

      expect(result).toEqual({ ...user, organisation });
    });

    it('should throw an error if the user is inactive', async () => {
      const user = { id: 'user1', active: false, organisationId: 'org1' };
      const organisation = { active: true };

      tokenService.verify.mockResolvedValue(user);
      organisationService.getByIdOrThrow.mockResolvedValue(organisation);

      await expect(
        socketService.verifySocketAuthentication('token1'),
      ).rejects.toThrow('User is inactive');
    });
  });
});
