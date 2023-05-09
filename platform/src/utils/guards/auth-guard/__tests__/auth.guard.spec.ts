import { ExecutionContext, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '../auth.guard';
import { TokenService } from '../../../../modules/domain/token/token.service';
import { OrganisationService } from '../../../../modules/domain/organisation/organisation.service';
import { InternalException } from '../../../../exceptions/internal-exception';
import { UserRole } from '../../../../modules/domain/user/user';

// Define a mock implementation of the TokenService class
class MockTokenService {
  public async verify() {
    return {
      id: 1,
      email: 'test@example.com',
      active: true,
      role: UserRole.ADMIN,
      organisationId: 1,
    };
  }
}

// Define a mock implementation of the OrganisationService class
class MockOrganisationService {
  public async getByIdOrThrow() {
    return {
      id: 1,
      name: 'Test Organisation',
      active: true,
    };
  }
}

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    authGuard = new AuthGuard(
      reflector,
      new MockTokenService() as unknown as TokenService,
      new MockOrganisationService() as unknown as OrganisationService,
    );
  });

  describe('canActivate', () => {
    test('throws an exception when token is not provided', async () => {
      const context: ExecutionContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {},
          }),
        }),
      } as ExecutionContext;

      await expect(authGuard.canActivate(context)).rejects.toThrow(
        new InternalException(
          'AUTH.AUTHORIZATION_NOT_PROVIDED',
          'token not found',
          HttpStatus.UNAUTHORIZED,
        ),
      );
    });
  });
});
