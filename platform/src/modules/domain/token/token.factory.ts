import { UUID } from '../../../types/uuid.type';
import { DateTime } from 'luxon';
import { Token, TokenType } from './token';

export class TokenFactory {
  static create(
    userId: UUID,
    value: string,
    type: TokenType,
    expiryDate: DateTime,
  ): Token {
    return new Token(userId, value, type, expiryDate);
  }
}
