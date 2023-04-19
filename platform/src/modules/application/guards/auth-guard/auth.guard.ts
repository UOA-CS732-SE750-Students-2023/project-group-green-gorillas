import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { InternalException } from '../../../../exceptions/internal-exception';
import { TokenService } from '../../../domain/token/token.service';
import { TokenType } from '../../../domain/token/token';
import { OrganisationService } from '../../../domain/organisation/organisation.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly organisationService: OrganisationService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const accessToken = request.headers['authorization'];

    if (!accessToken) {
      throw new InternalException(
        'AUTH.AUTHORIZATION_NOT_PROVIDED',
        'token not found',
        HttpStatus.FORBIDDEN,
      );
    }

    const user = await this.tokenService.verify(
      accessToken,
      TokenType.ACCESS_TOKEN,
    );

    if (!user.active) {
      throw new InternalException(
        'TOKEN.INVALID',
        'user in token is inactive',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const organisation = await this.organisationService.getByIdOrThrow(
      user.organisationId,
    );

    if (!organisation.active) {
      throw new InternalException(
        'TOKEN.INVALID',
        'user organisation in token is inactive',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // TODO: role control

    request.user = {
      ...user,
      organisation,
    };

    return true;
  }
}

export const UseAuthGuard = () => UseGuards(AuthGuard);
