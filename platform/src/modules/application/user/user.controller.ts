import { Controller, Get } from '@nestjs/common';
import { UseAuthGuard } from '../../../utils/guards/auth-guard/auth.guard';
import {
  RequestUser,
  RequestUserType,
} from '../../../utils/decorators/request-user';
import { UserService } from './user.service';

@Controller({
  path: ['api/user'],
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  @UseAuthGuard()
  public async getCurrentUser(@RequestUser() user: RequestUserType) {
    const userTeams = await this.userService.getActiveUserTeams(user.id);

    return {
      ...user,
      teams: userTeams,
    };
  }
}
