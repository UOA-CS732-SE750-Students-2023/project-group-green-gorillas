import { Controller, Get } from '@nestjs/common';
import { RetrospectiveService } from './retrospective.service';
import { UseAuthGuard } from '../../../utils/guards/auth-guard/auth.guard';
import {
  RequestUser,
  RequestUserType,
} from '../../../utils/decorators/request-user';

@Controller({
  path: ['api/retrospective'],
})
@UseAuthGuard()
export class RetrospectiveController {
  constructor(private readonly retrospectiveService: RetrospectiveService) {}

  @Get('template/list')
  public async getRetrospectiveTemplates(@RequestUser() user: RequestUserType) {
    return this.retrospectiveService.getRetrospectiveTemplates(
      user.organisationId,
    );
  }
}
