import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  AllowedRoles,
  UseAuthGuard,
} from '../../../utils/guards/auth-guard/auth.guard';
import {
  AddOrUpdateTeamUserRequest,
  AddTeamRequest,
  GetBoardTimeInvestRequestParams,
  GetHasInProgressRetro,
  GetTeamByIdRequestParams,
  GetTeamInsightRequestParams,
  GetTeamRetroHistoryRequestParam,
  GetTeamRoleRequestParams,
  RemoveTeamUserRequest,
  UpdateTeamActiveRequest,
  UpdateTeamActiveRequestParams,
  UpdateTeamRequest,
  UpdateTeamRequestParams,
} from './dto/request';
import { TeamService } from './team.service';
import {
  RequestUser,
  RequestUserType,
} from '../../../utils/decorators/request-user';
import { UserRole } from '../../domain/user/user';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Team')
@Controller({
  path: ['api/team'],
})
@UseAuthGuard()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiOkResponse({
    description: 'Get team board time invest',
  })
  @Get('board-time-invest/:teamId')
  public getTeamBoardTimeInvest(
    @Param() { teamId }: GetBoardTimeInvestRequestParams,
  ) {
    return this.teamService.getTeamBoardTimeInvest(teamId);
  }

  @ApiOkResponse({
    description: 'Get team retro history list',
  })
  @Get('retro-history/:teamId')
  public getTeamRetroHistory(
    @Param() { teamId }: GetTeamRetroHistoryRequestParam,
  ) {
    return this.teamService.getTeamRetroHistory(teamId);
  }

  @ApiOkResponse({
    description: 'get team in-progress retro',
  })
  @Get('in-progress-retro/:teamId')
  public async getInProgressRetro(@Param() { teamId }: GetHasInProgressRetro) {
    const retro = await this.teamService.getInProgressRetro(teamId);

    return {
      retro: retro ?? null,
    };
  }

  @ApiOkResponse({
    description: 'Check whether team has progress retro',
  })
  @Get('has-in-progress-retro/:teamId')
  public getHasInProgressRetro(
    @Param() { teamId }: GetHasInProgressRetro,
  ): Promise<boolean> {
    return this.teamService.hasInProgressRetro(teamId);
  }

  @ApiOkResponse({
    description: 'Get team insight for dashboard',
  })
  @Get('insight/:teamId')
  public getTeamInsight(
    @RequestUser() user: RequestUserType,
    @Param() { teamId }: GetTeamInsightRequestParams,
  ) {
    return this.teamService.getTeamInsight(teamId, user.organisationId);
  }

  @ApiOkResponse({
    description: 'Get current user role',
  })
  @Get('team-role/:teamId')
  public getCurrentUserTeamRole(
    @RequestUser() user: RequestUserType,
    @Param() { teamId }: GetTeamRoleRequestParams,
  ) {
    return this.teamService.getTeamRole(user.id, teamId);
  }

  @ApiOkResponse({
    description: 'List all organisation teams',
  })
  @Get('list')
  @AllowedRoles([UserRole.ADMIN])
  public getOrganisationTeams(@RequestUser() user: RequestUserType) {
    return this.teamService.getOrganisationTeams(user.organisationId);
  }

  @ApiOkResponse({
    description: 'get users team',
  })
  @Get('/:teamId')
  public getUserTeamById(
    @Param() { teamId }: GetTeamByIdRequestParams,
    @RequestUser() user: RequestUserType,
  ) {
    return this.teamService.getUserTeamById(teamId, user.organisationId, user);
  }

  @ApiOkResponse({
    description: 'Update team user',
  })
  @Put('update-team-user')
  @AllowedRoles([UserRole.ADMIN])
  public async updateTeamUser(
    @RequestUser() user: RequestUserType,
    @Body() { userId, userTeamRole, teamId }: AddOrUpdateTeamUserRequest,
  ) {
    return this.teamService.addOrUpdateTeamUser(
      teamId,
      user.organisationId,
      userId,
      userTeamRole,
    );
  }

  @ApiOkResponse({
    description: 'Update Team Info',
  })
  @Put('/:teamId')
  @AllowedRoles([UserRole.ADMIN])
  public updateTeam(
    @RequestUser() user: RequestUserType,
    @Param() { teamId }: UpdateTeamRequestParams,
    @Body() { name, active }: UpdateTeamRequest,
  ) {
    return this.teamService.updateTeam(
      teamId,
      user.organisationId,
      name,
      active,
    );
  }

  @ApiOkResponse({
    description: 'Activate/Disable the team',
  })
  @Patch('update-active/:teamId')
  @AllowedRoles([UserRole.ADMIN])
  public async updateTeamActive(
    @RequestUser() user: RequestUserType,
    @Body() { active }: UpdateTeamActiveRequest,
    @Param() { teamId }: UpdateTeamActiveRequestParams,
  ) {
    return this.teamService.updateTeamActive(
      teamId,
      user.organisationId,
      active,
    );
  }

  @ApiOkResponse({
    description: 'Add team',
  })
  @Post('/')
  @AllowedRoles([UserRole.ADMIN])
  public async addTeam(
    @RequestUser() user: RequestUserType,
    @Body() { name }: AddTeamRequest,
  ) {
    return this.teamService.addTeam(name, user.organisationId);
  }

  @ApiOkResponse({
    description: 'Add team user',
  })
  @Post('add-team-user')
  @AllowedRoles([UserRole.ADMIN])
  public async addTeamUser(
    @RequestUser() user: RequestUserType,
    @Body() { userId, userTeamRole, teamId }: AddOrUpdateTeamUserRequest,
  ) {
    return this.teamService.addOrUpdateTeamUser(
      teamId,
      user.organisationId,
      userId,
      userTeamRole,
    );
  }

  @ApiOkResponse({
    description: 'remove team user',
  })
  @Delete('remove-team-user')
  @AllowedRoles([UserRole.ADMIN])
  public async removeTeamUser(
    @RequestUser() user: RequestUserType,
    @Body() { userId, teamId }: RemoveTeamUserRequest,
  ) {
    return this.teamService.removeTeamUser(userId, teamId);
  }
}
