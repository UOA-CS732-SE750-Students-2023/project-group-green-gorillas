import { HttpStatus } from '@nestjs/common';
import { InternalExceptionFilter } from '../internal-exception.filter';
import { InternalException } from '../../../exceptions/internal-exception';

describe('InternalExceptionFilter', () => {
  const mockI18nService = {
    translate: jest.fn(),
  };

  const filter = new InternalExceptionFilter(mockI18nService as any);

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;

  const mockHost = {
    switchToHttp: jest.fn().mockReturnThis(),
    getResponse: jest.fn().mockReturnValue(mockResponse),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set the response status and JSON body', async () => {
    const errorCode = 'TEST_ERROR';
    const statusCode = HttpStatus.BAD_REQUEST;
    const translationData = { arg1: 'value1', arg2: 'value2' };

    const exception = new InternalException(
      errorCode,
      'Test error message',
      statusCode,
      translationData,
    );

    const translatedMessage = 'Translated error message';

    mockI18nService.translate.mockResolvedValue(translatedMessage);

    await filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(statusCode);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: translatedMessage,
      errorCode,
      statusCode,
      innerExceptionMessage: 'Test error message',
    });
  });

  it('should log the exception', async () => {
    const exception = new InternalException('TEST_ERROR', 'Test error message');

    filter.catch(exception, mockHost);

    expect(filter['logger'].error).not.toBeNull();
  });
});
