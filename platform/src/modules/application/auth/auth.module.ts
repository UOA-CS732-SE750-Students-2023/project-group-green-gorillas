import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserAuthModule } from '../../domain/user-auth/user-auth.module';
import { UserModule } from '../../domain/user/user.module';
import { TokenModule } from '../../domain/token/token.module';
import { OrganisationModule } from '../../domain/organisation/organisation.module';
import { SendgridMailModule } from '../../external/sendgrid-mail/sendgrid-mail.module';

@Module({
  imports: [
    UserAuthModule,
    UserModule,
    TokenModule,
    OrganisationModule,
    SendgridMailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
