import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway as WebSocketGatewayDecorator,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { TokenService } from '../../domain/token/token.service';
import { TokenType } from '../../domain/token/token';
import { OrganisationService } from '../../domain/organisation/organisation.service';

export enum ClientSocketMessageEvent {
  AUTHENTICATION_ERROR = 'authentication-error',
}

@WebSocketGatewayDecorator({
  cors: {
    origin: '*',
  },
})
export class WebSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('SocketGateway');

  constructor(
    private readonly tokenService: TokenService,
    private readonly organisationService: OrganisationService,
  ) {}

  public afterInit() {
    this.logger.log('Web socket server is initialize');
  }

  public async handleConnection(client) {
    const token = client?.handshake?.headers?.authorization ?? '';

    try {
      const user = await this.tokenService.verify(
        token,
        TokenType.ACCESS_TOKEN,
      );

      if (!user.active) {
        throw new Error('User is inactive');
      }

      const organisation = await this.organisationService.getByIdOrThrow(
        user.organisationId,
      );

      if (!organisation.active) {
        throw new Error('Organisation is inactive');
      }

      client.data.user = {
        ...user,
        organisation,
      };

      this.logger.log(`${user.id} is connected`);
    } catch (_) {
      client.emit(
        ClientSocketMessageEvent.AUTHENTICATION_ERROR,
        JSON.stringify({
          message: 'Failed to connect to websocket',
        }),
      );
      client.disconnect();
    }
  }

  public handleDisconnect(client) {
    this.logger.log(`${client?.data?.user?.id || client.id} is disconnected`);
  }
}
