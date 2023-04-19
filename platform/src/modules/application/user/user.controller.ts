import { Controller, Get } from '@nestjs/common';
import { UserService } from '../../domain/user/user.service';
import { UseAuthGuard } from '../../../utils/guards/auth-guard/auth.guard';
import {
  RequestUser,
  RequestUserType,
} from '../../../utils/decorators/request-user';

@Controller({
  path: ['api/user'],
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  @UseAuthGuard()
  public getCurrentUserWithOrganisation(
    @RequestUser() user: RequestUserType,
  ): RequestUserType {
    return user;
  }
}
