import { Controller, Get, Param } from '@nestjs/common';
import { UseAuthGuard } from '../../../utils/guards/auth-guard/auth.guard';
import { GetTeamByIdRequestParams } from './dto/request';
import { TeamService } from './team.service';
import {
  RequestUser,
  RequestUserType,
} from '../../../utils/decorators/request-user';

@Controller({
  path: ['api/team'],
})
@UseAuthGuard()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('/:teamId')
  public getTeamById(
    @Param() { teamId }: GetTeamByIdRequestParams,
    @RequestUser() user: RequestUserType,
  ) {
    return this.teamService.getTeamById(teamId, user.organisationId, user.id);
  }
}
