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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller({
  path: ['api/user'],
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    description: 'Get current user info',
  })
  @Get('current')
  @UseAuthGuard()
  public async getCurrentUser(@RequestUser() user: RequestUserType) {
    const userTeams = await this.userService.getActiveUserTeams(user.id);

    return {
      ...user,
      teams: userTeams,
    };
  }

  @ApiOkResponse({
    description: 'Update current user info',
  })
  @Put('current')
  @UseAuthGuard()
  public async updateCurrentUser(
    @RequestUser() user: RequestUserType,
    @Body()
    {
      displayName,
      firstName,
      lastName,
      phone,
      address,
      gender,
    }: UpdateCurrentUser,
  ) {
    return this.userService.updateUser(
      user.id,
      user.organisationId,
      displayName,
      firstName,
      lastName,
      true,
      phone,
      gender,
      address,
    );
  }

  @ApiOkResponse({
    description: 'Update user by user id',
  })
  @Put('/:userId')
  @UseAuthGuard()
  @AllowedRoles([UserRole.ADMIN])
  public async updateUser(
    @RequestUser() user: RequestUserType,
    @Body()
    {
      displayName,
      firstName,
      lastName,
      role,
      active,
      phone,
      address,
      gender,
    }: UpdateUserRequest,
    @Param() { userId }: UpdateUserRequestParams,
  ) {
    return this.userService.updateUser(
      userId,
      user.organisationId,
      displayName,
      firstName,
      lastName,
      active,
      phone,
      gender,
      address,
      role,
    );
  }

  @ApiOkResponse({
    description: 'Create user',
  })
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
      phone,
      address,
      gender,
    }: CreateUserRequest,
  ) {
    return this.userService.createUser(
      email,
      user.organisationId,
      displayName,
      firstName,
      lastName,
      phone,
      address,
      gender,
      role,
      temporaryPassword,
    );
  }

  @ApiOkResponse({
    description: 'Disable/Activate user',
  })
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

  @ApiOkResponse({
    description: 'list all users within the current user organisation',
  })
  @Get('list')
  @UseAuthGuard()
  public async getOrganisationUsers(@RequestUser() user: RequestUserType) {
    return this.userService.listUsersByOrganisationId(user.organisationId);
  }
}
