import { Controller, Get, Param } from '@nestjs/common';
import {
  AllowedRoles,
  UseAuthGuard,
} from '../../../utils/guards/auth-guard/auth.guard';
import { GetTeamByIdRequestParams } from './dto/request';
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
}
