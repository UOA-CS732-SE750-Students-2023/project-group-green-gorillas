import { Module } from '@nestjs/common';
import { OrganisationModule } from '../../domain/organisation/organisation.module';
import { DataSeederService } from './data-seeder.service';
import { UserModule } from '../../domain/user/user.module';
import { UserAuthModule } from '../../domain/user-auth/user-auth.module';
import { DataSeederController } from './data-seeder.controller';
import { TeamModule } from '../../domain/team/team.module';
import { UserTeamModule } from '../../domain/user-team/user-team.module';
import { BoardTemplateModule } from '../../domain/board-template/board-template.module';

@Module({
  imports: [
    OrganisationModule,
    UserModule,
    UserAuthModule,
    TeamModule,
    UserTeamModule,
    BoardTemplateModule,
  ],
  providers: [DataSeederService],
  controllers: [DataSeederController],
})
export class DataSeederModule {}
