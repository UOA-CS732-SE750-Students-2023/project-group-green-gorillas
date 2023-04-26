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
  GetTeamByIdRequestParams,
  GetTeamInsightRequestParams,
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

@Controller({
  path: ['api/team'],
})
@UseAuthGuard()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('insight/:teamId')
  public getTeamInsight(
    @RequestUser() user: RequestUserType,
    @Param() { teamId }: GetTeamInsightRequestParams,
  ) {
    return this.teamService.getTeamInsight(teamId, user.organisationId);
  }

  @Get('team-role/:teamId')
  public getCurrentUserTeamRole(
    @RequestUser() user: RequestUserType,
    @Param() { teamId }: GetTeamRoleRequestParams,
  ) {
    return this.teamService.getTeamRole(user.id, teamId);
  }

  @Get('list')
  @AllowedRoles([UserRole.ADMIN])
  public getOrganisationTeams(@RequestUser() user: RequestUserType) {
    return this.teamService.getOrganisationTeams(user.organisationId);
  }

  @Get('/:teamId')
  public getUserTeamById(
    @Param() { teamId }: GetTeamByIdRequestParams,
    @RequestUser() user: RequestUserType,
  ) {
    return this.teamService.getUserTeamById(teamId, user.organisationId, user);
  }

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

  @Delete('remove-team-user')
  @AllowedRoles([UserRole.ADMIN])
  public async removeTeamUser(
    @RequestUser() user: RequestUserType,
    @Body() { userId, teamId }: RemoveTeamUserRequest,
  ) {
    return this.teamService.removeTeamUser(userId, teamId);
  }
}
