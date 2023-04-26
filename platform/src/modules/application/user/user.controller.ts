import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import {
  AllowedRoles,
  UseAuthGuard,
} from '../../../utils/guards/auth-guard/auth.guard';
import {
  RequestUser,
  RequestUserType,
} from '../../../utils/decorators/request-user';
import { UserService } from './user.service';
import {
  CreateUserRequest,
  UpdateCurrentUser,
  UpdateUserActiveRequest,
  UpdateUserActiveRequestParams,
  UpdateUserRequest,
  UpdateUserRequestParams,
} from './dto/request';
import { UserRole } from '../../domain/user/user';

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

  @Put('current')
  @UseAuthGuard()
  public async updateCurrentUser(
    @RequestUser() user: RequestUserType,
    @Body() { displayName, firstName, lastName }: UpdateCurrentUser,
  ) {
    return this.userService.updateUser(
      user.id,
      user.organisationId,
      displayName,
      firstName,
      lastName,
      true,
    );
  }

  @Put('/:userId')
  @UseAuthGuard()
  @AllowedRoles([UserRole.ADMIN])
  public async updateUser(
    @RequestUser() user: RequestUserType,
    @Body()
    { displayName, firstName, lastName, role, active }: UpdateUserRequest,
    @Param() { userId }: UpdateUserRequestParams,
  ) {
    return this.userService.updateUser(
      userId,
      user.organisationId,
      displayName,
      firstName,
      lastName,
      active,
      role,
    );
  }

  @Post()
  @UseAuthGuard()
  @AllowedRoles([UserRole.ADMIN])
  public async createUser(
    @RequestUser() user: RequestUserType,
    @Body()
    {
      email,
      displayName,
      firstName,
      lastName,
      role,
      temporaryPassword,
    }: CreateUserRequest,
  ) {
    return this.userService.createUser(
      email,
      user.organisationId,
      displayName,
      firstName,
      lastName,
      role,
      temporaryPassword,
    );
  }

  @Patch('update-active/:userId')
  @UseAuthGuard()
  @AllowedRoles([UserRole.ADMIN])
  public async updateUserActive(
    @RequestUser() user: RequestUserType,
    @Body() { active }: UpdateUserActiveRequest,
    @Param() { userId }: UpdateUserActiveRequestParams,
  ) {
    return this.userService.updateUserActive(
      userId,
      user.organisationId,
      active,
    );
  }

  @Get('list')
  @UseAuthGuard()
  public async getOrganisationUsers(@RequestUser() user: RequestUserType) {
    return this.userService.listUsersByOrganisationId(user.organisationId);
  }
}
