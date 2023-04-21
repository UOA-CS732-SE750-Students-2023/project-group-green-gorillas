import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { InternalException } from '../../../exceptions/internal-exception';
import { TokenService } from '../../../modules/domain/token/token.service';
import { TokenType } from '../../../modules/domain/token/token';
import { OrganisationService } from '../../../modules/domain/organisation/organisation.service';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../../modules/domain/user/user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
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
        HttpStatus.UNAUTHORIZED,
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

    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (roles && !roles.includes(user.role)) {
      throw new InternalException(
        'AUTH.ROLE_NOT_ALLOWED',
        'role not allowed',
        HttpStatus.FORBIDDEN,
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

    request.user = {
      ...user,
      organisation,
    };

    return true;
  }
}

export const UseAuthGuard = () => UseGuards(AuthGuard);
export const AllowedRoles = (roles: UserRole[]) => SetMetadata('roles', roles);
