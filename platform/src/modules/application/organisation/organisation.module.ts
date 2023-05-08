import { OrganisationModule as OrganisationDomainModule } from '../../domain/organisation/organisation.module';
import { Module } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { OrganisationController } from './organisation.controller';
import { TokenModule } from '../../domain/token/token.module';
import { UserModule } from '../../domain/user/user.module';

@Module({
  imports: [OrganisationDomainModule, TokenModule, UserModule],
  providers: [OrganisationService],
  controllers: [OrganisationController],
})
export class OrganisationModule {}
