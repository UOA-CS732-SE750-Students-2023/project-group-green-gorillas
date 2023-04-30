import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Injectable()
export class SocketEventService {
  constructor(private readonly socketGateway: SocketGateway) {}

  public broadcastRoom(roomId: string, event: string, message: any): void {
    const messageToSend =
      typeof message === 'string' ? message : JSON.stringify(message);

    this.socketGateway.webSocketServer.to(roomId).emit(event, messageToSend);
  }
}
