import { Injectable } from '@nestjs/common';
import { TokenService } from '../../domain/token/token.service';
import { OrganisationService } from '../../domain/organisation/organisation.service';
import { TokenType } from '../../domain/token/token';
import { RequestUserType } from '../../../utils/decorators/request-user';
import { UUID } from '../../../types/uuid.type';
import { BoardService } from '../../domain/board/board.service';
import { BoardStage } from '../../domain/board/board';
import { UserTeamService } from '../../domain/user-team/user-team.service';
import { Server } from 'socket.io';
import { uniqBy } from 'lodash';

@Injectable()
export class SocketService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly organisationService: OrganisationService,
    private readonly boardService: BoardService,
    private readonly userTeam: UserTeamService,
  ) {}

  public async getRoomUsers(webSocketServer: Server, roomId: string) {
    const sockets = await webSocketServer.sockets.adapter.fetchSockets({
      rooms: new Set([roomId]),
      except: new Set(),
    });

    return uniqBy(
      sockets
        .filter((socket) => !!socket?.data?.user)
        .map((socket) => socket.data.user),
      'id',
    );
  }

  public async verifySocketAuthentication(token: string) {
    const user = await this.tokenService.verify(token, TokenType.ACCESS_TOKEN);

    if (!user.active) {
      throw new Error('User is inactive');
    }

    const organisation = await this.organisationService.getByIdOrThrow(
      user.organisationId,
    );

    if (!organisation.active) {
      throw new Error('Organisation is inactive');
    }

    return {
      ...user,
      organisation,
    };
  }

  public async verifyJoinRoomEvent(
    boardId?: UUID,
    teamId?: UUID,
    user?: RequestUserType,
  ) {
    if (!boardId || !teamId || !user) {
      throw new Error('Request is invalid');
    }

    const board = await this.boardService.getByIdOrThrow(boardId, teamId);

    const userTeams = await this.userTeam.listByUserId(user.id);

    if (
      board.organisationId !== user.organisationId ||
      board.stage === BoardStage.FINALIZE ||
      !userTeams.find((userTeam) => userTeam.teamId === teamId)
    ) {
      throw new Error('Cannot access to room');
    }

    return board;
  }
}
