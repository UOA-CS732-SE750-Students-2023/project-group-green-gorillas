import { ExecutionContext, HttpStatus } from '@nestjs/common';
import { RequestUser, RequestUserType } from '../request-user';
import { InternalException } from '../../../exceptions/internal-exception';

describe('RequestUser', () => {
  it('should return the user from the request object', () => {
    const user = { id: 1, name: 'John Doe' };
    const organisation = { id: 1, name: 'Acme Inc.' };
    const request = {
      user: {
        ...user,
        organisation,
      },
    };
    const context: any = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };
    const result = RequestUser(null, context) as unknown as RequestUserType;

    expect(result).not.toBeNull();
  });

  it('should throw an InternalException if user is not present in the request object', () => {
    const request = { user: null };
    const context: any = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };

    expect(() => RequestUser(null, context)).not.toThrow(
      new InternalException(
        'USER.FAILED_TO_GET',
        'cannot get user in request',
        HttpStatus.UNAUTHORIZED,
      ),
    );
  });
});
