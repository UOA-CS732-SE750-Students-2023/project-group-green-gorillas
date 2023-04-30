import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { TokenModule } from '../../domain/token/token.module';
import { OrganisationModule } from '../../domain/organisation/organisation.module';
import { SocketService } from './socket.service';
import { BoardModule } from '../../domain/board/board.module';
import { UserTeamModule } from '../../domain/user-team/user-team.module';
import { SocketEventService } from './socket-event.service';

@Module({
  imports: [TokenModule, OrganisationModule, BoardModule, UserTeamModule],
  providers: [SocketGateway, SocketService, SocketEventService],
  exports: [SocketEventService],
})
export class SocketModule {}
