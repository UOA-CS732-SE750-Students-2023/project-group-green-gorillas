import { HttpStatus, Inject, Injectable } from '@nestjs/common';
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
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class TokenService {
  private readonly tokenSecret: string;

  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly internalConfigService: InternalConfigService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    this.tokenSecret = this.internalConfigService.getTokenConfig().tokenSecret;
  }

  public async getByUserId(
    userId: UUID,
    tokenValue: string,
  ): Promise<Token | undefined> {
    const rawCacheToken = await this.cacheManager.get<string>(
      TokenService.buildTokenKey(userId, tokenValue),
    );

    if (rawCacheToken) {
      const cacheToken = JSON.parse(rawCacheToken);

      return cacheToken ? plainToClass(Token, cacheToken) : undefined;
    }

    const token = await this.tokenRepository.getByUserId(userId, tokenValue);

    await this.cacheManager.set(
      TokenService.buildTokenKey(userId, tokenValue),
      !!token ? JSON.stringify(classToPlain(token)) : undefined,
      3600,
    );

    return token;
  }

  public async getByUserIdOrThrow(
    userId: UUID,
    tokenValue: string,
  ): Promise<Token> {
    const token = await this.getByUserId(userId, tokenValue);

    if (!token) {
      throw new InternalException('TOKEN.NOT_FOUND', 'token is not found');
    }

    return token;
  }

  private static buildTokenKey(userId: UUID, tokenValue: string): string {
    return `token-${userId}-${tokenValue}`;
  }

  public async save(token: Token): Promise<Token> {
    await this.cacheManager.del(
      TokenService.buildTokenKey(token.userId, token.value),
    );
    return this.tokenRepository.save(token);
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
        exp: expiryDate.toSeconds(),
        data: JSON.stringify({
          userId,
          organisationId,
        }),
      },
      this.tokenSecret,
    );

    return this.save(TokenFactory.create(userId, tokenValue, type, expiryDate));
  }

  public async verify(tokenValue: string, tokenType: TokenType): Promise<User> {
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

      if (tokenInDB.type !== tokenType) {
        throw new InternalException('TOKEN.INVALID', 'Token type is incorrect');
      }

      if (tokenInDB.expiryDate.toMillis() < DateTime.now().toMillis()) {
        await this.delete(userId, tokenValue);
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

  public async delete(userId: UUID, tokenValue: string): Promise<void> {
    await this.cacheManager.del(TokenService.buildTokenKey(userId, tokenValue));
    return this.tokenRepository.delete(userId, tokenValue);
  }
}
