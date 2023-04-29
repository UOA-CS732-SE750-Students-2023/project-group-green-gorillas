import { Module } from '@nestjs/common';
import { WebSocketGateway } from './socket.gateway';
import { TokenModule } from '../../domain/token/token.module';
import { OrganisationModule } from '../../domain/organisation/organisation.module';

@Module({
  imports: [TokenModule, OrganisationModule],
  providers: [WebSocketGateway],
})
export class SocketModule {}
