import { Body, Controller, Patch } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import {
  AllowedRoles,
  UseAuthGuard,
} from '../../../utils/guards/auth-guard/auth.guard';
import { UserRole } from '../../domain/user/user';
import {
  RequestUser,
  RequestUserType,
} from '../../../utils/decorators/request-user';
import { UpdateOrganisationName } from './dto/request';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrganisationResponse } from './dto/response';

@ApiTags('Organisation')
@Controller({
  path: ['api/organisation'],
})
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @ApiOkResponse({
    description: 'Update the organisation name',
    type: OrganisationResponse,
  })
  @Patch('update-name')
  @UseAuthGuard()
  @AllowedRoles([UserRole.ADMIN])
  public updateOrganisationName(
    @RequestUser() user: RequestUserType,
    @Body() { name }: UpdateOrganisationName,
  ) {
    return this.organisationService.updateOrganisationName(
      user.organisationId,
      name,
    );
  }
}
