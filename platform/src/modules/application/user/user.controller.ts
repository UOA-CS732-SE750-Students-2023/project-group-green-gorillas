import { Controller, Get } from '@nestjs/common';
import { UserService } from '../../domain/user/user.service';
import { UseAuthGuard } from '../guards/auth-guard/auth.guard';
import {
  RequestUser,
  UserWithOrganisation,
} from '../../../utils/decorators/request-user';

@Controller({
  path: ['api/user'],
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  @UseAuthGuard()
  public getCurrentUserWithOrganisation(
    @RequestUser() user: UserWithOrganisation,
  ): UserWithOrganisation {
    return user;
  }
}
