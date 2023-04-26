import { Module } from '@nestjs/common';
import { RetrospectiveController } from './retrospective.controller';
import { RetrospectiveService } from './retrospective.service';
import { TokenModule } from '../../domain/token/token.module';
import { UserModule } from '../../domain/user/user.module';
import { OrganisationModule } from '../../domain/organisation/organisation.module';
import { BoardTemplateModule } from '../../domain/board-template/board-template.module';

@Module({
  imports: [TokenModule, UserModule, OrganisationModule, BoardTemplateModule],
  controllers: [RetrospectiveController],
  providers: [RetrospectiveService],
})
export class RetrospectiveModule {}
