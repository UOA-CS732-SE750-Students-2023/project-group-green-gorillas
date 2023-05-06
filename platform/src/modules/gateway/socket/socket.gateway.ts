import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway as WebSocketGatewayDecorator,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import * as Bluebird from 'bluebird';

export enum ClientSocketMessageEvent {
  AUTHENTICATION = 'authentication',
  JOIN_RETRO_ROOM = 'join-retro-room',
  RETRO_ROOM_USERS = 'retro-room-users',
  BOARD = 'board',
  BOARD_SECTION = 'board-section',
  BOARD_NOTE = 'board-note',
  BOARD_ACTION_ITEM = 'board-action-item',
  BOARD_VOTE_NOTE = 'board-vote-note',
}

export enum ServerSocketMessageEvent {
  JOIN_RETRO_ROOM = 'join-retro-room',
  LEAVE_RETRO_ROOM = 'leave-retro-room',
}

@WebSocketGatewayDecorator({
  cors: {
    origin: '*',
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() public readonly webSocketServer: Server;

  private logger: Logger = new Logger('SocketGateway');

  constructor(private readonly socketService: SocketService) {}

  public afterInit() {
    this.logger.log('Web socket server is initialize');
  }

  public async handleConnection(client: Socket) {
    const token = client?.handshake?.auth?.token ?? '';
    try {
      const requestUser = await this.socketService.verifySocketAuthentication(
        token,
      );

      client.data.user = requestUser;
      client.data.rooms = [];

      client.emit(
        ClientSocketMessageEvent.AUTHENTICATION,
        JSON.stringify({
          success: true,
        }),
      );
      this.logger.log(`${requestUser.id} is connected`);
    } catch (error) {
      this.logger.error(error);
      client.emit(
        ClientSocketMessageEvent.AUTHENTICATION,
        JSON.stringify({
          success: false,
        }),
      );
      client.disconnect();
    }
  }

  public async handleDisconnect(client: Socket) {
    this.logger.log(`${client?.data?.user?.id || client.id} is disconnected`);

    const rooms: string[] = client?.data?.rooms ?? [];

    await Bluebird.map(rooms, async (room) => {
      const roomUsers = await this.socketService.getRoomUsers(
        this.webSocketServer,
        room,
      );

      this.webSocketServer.sockets
        .in(room)
        .emit(
          ClientSocketMessageEvent.RETRO_ROOM_USERS,
          JSON.stringify({ users: roomUsers }),
        );
    });
  }

  @SubscribeMessage(ServerSocketMessageEvent.LEAVE_RETRO_ROOM)
  public async handleLeaveRetroRoomMessage(
    client: Socket,
    boardId: string,
  ): Promise<void> {
    client.leave(boardId);

    const roomUsers = await this.socketService.getRoomUsers(
      this.webSocketServer,
      boardId,
    );
    this.webSocketServer.sockets
      .in(boardId)
      .emit(
        ClientSocketMessageEvent.RETRO_ROOM_USERS,
        JSON.stringify({ users: roomUsers }),
      );
  }

  @SubscribeMessage(ServerSocketMessageEvent.JOIN_RETRO_ROOM)
  public async handleJoinRetroRoomMessage(
    client: Socket,
    payload: string, // {boardId: UUID, teamId: UUID}
  ): Promise<void> {
    try {
      const { boardId, teamId } = JSON.parse(payload);

      const board = await this.socketService.verifyJoinRoomEvent(
        boardId,
        teamId,
        client?.data?.user,
      );

      client.join(board.id);
      client.data.rooms = [...client.data.rooms, board.id];

      client.emit(
        ClientSocketMessageEvent.JOIN_RETRO_ROOM,
        JSON.stringify({ success: true }),
      );

      const roomUsers = await this.socketService.getRoomUsers(
        this.webSocketServer,
        board.id,
      );

      this.webSocketServer.sockets
        .in(boardId)
        .emit(
          ClientSocketMessageEvent.RETRO_ROOM_USERS,
          JSON.stringify({ users: roomUsers }),
        );
    } catch (error) {
      this.logger.error(error);
      client.emit(
        ClientSocketMessageEvent.JOIN_RETRO_ROOM,
        JSON.stringify({ success: false }),
      );
    }
  }
}
