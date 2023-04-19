import {
  createParamDecorator,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { User } from '../../modules/domain/user/user';
import { Organisation } from '../../modules/domain/organisation/organisation';
import { InternalException } from '../../exceptions/internal-exception';

export type RequestUserType = User & {
  organisation: Organisation;
};

export const RequestUser = createParamDecorator<RequestUserType>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user = request.user;

    if (!user) {
      throw new InternalException(
        'USER.FAILED_TO_GET',
        'cannot get user in request',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  },
);
