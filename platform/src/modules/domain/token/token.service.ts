import { HttpStatus, Injectable } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { UUID } from '../../../types/uuid.type';
import { Token, TokenType } from './token';
import { InternalException } from '../../../exceptions/internal-exception';
import { DateTime } from 'luxon';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { InternalConfigService } from '../../global/config/internal-config.service';
import { TokenFactory } from './token.factory';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Injectable()
export class TokenService {
  private readonly tokenSecret: string;

  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly internalConfigService: InternalConfigService,
    private readonly userService: UserService,
  ) {
    this.tokenSecret = this.internalConfigService.getTokenConfig().tokenSecret;
  }

  public getByUserId(
    userId: UUID,
    tokenValue: string,
  ): Promise<Token | undefined> {
    return this.tokenRepository.getByUserId(userId, tokenValue);
  }

  public async getByUserIdOrThrow(
    userId: UUID,
    tokenValue: string,
  ): Promise<Token> {
    const token = await this.tokenRepository.getByUserId(userId, tokenValue);

    if (!token) {
      throw new InternalException('TOKEN.NOT_FOUND', 'token is not found');
    }

    return token;
  }

  public async create(
    userId: UUID,
    organisationId: UUID,
    type: TokenType,
    ttl: number,
  ): Promise<Token> {
    const expiryDate = DateTime.now().plus({ second: ttl });

    const tokenValue = sign(
      {
        exp: expiryDate.toMillis(),
        data: JSON.stringify({
          userId,
          organisationId,
        }),
      },
      this.tokenSecret,
    );

    return this.tokenRepository.save(
      TokenFactory.create(userId, tokenValue, type, expiryDate),
    );
  }

  public async verify(tokenValue: string): Promise<User> {
    try {
      const { data } = verify(tokenValue, this.tokenSecret) as JwtPayload;

      const { userId, organisationId } = JSON.parse(data);

      if (!userId || !organisationId) {
        throw new InternalException(
          'TOKEN.INVALID',
          'There is no data payload',
        );
      }

      const tokenInDB = await this.getByUserIdOrThrow(userId, tokenValue);

      if (tokenInDB.expiryDate.toMillis() < DateTime.now().toMillis()) {
        throw new InternalException('TOKEN.INVALID', 'Token is expired');
      }

      return await this.userService.getByIdOrThrow(userId, organisationId);
    } catch (error) {
      throw new InternalException(
        'TOKEN.INVALID',
        error.message,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
