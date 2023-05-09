import { WinstonLoggerService } from '../winston-logger.service';

describe('WinstonLoggerService', () => {
  let service: any;

  beforeEach(() => {
    service = new WinstonLoggerService();
  });

  describe('log', () => {
    it('should call logger.info with the prepared message and context', () => {
      const infoSpy = jest.spyOn(service.logger, 'info').mockImplementation();
      const message = 'Hello world';
      const context = 'Test';

      service.log(message, context);

      expect(infoSpy).toHaveBeenCalledWith({
        message: message,
        context: context,
      });
    });
  });

  describe('error', () => {
    it('should call logger.error with the prepared message, trace and context', () => {
      const errorSpy = jest.spyOn(service.logger, 'error').mockImplementation();
      const message = 'Error occurred';
      const trace = 'Trace info';
      const context = 'Test';

      service.error(message, trace, context);

      expect(errorSpy).toHaveBeenCalledWith({
        message: message,
        trace: trace,
        context: context,
      });
    });
  });

  describe('warn', () => {
    it('should call logger.warn with the prepared message and context', () => {
      const warnSpy = jest.spyOn(service.logger, 'warn').mockImplementation();
      const message = 'Warning';
      const context = 'Test';

      service.warn(message, context);

      expect(warnSpy).toHaveBeenCalledWith({
        message: message,
        context: context,
      });
    });
  });

  describe('debug', () => {
    it('should call logger.debug with the prepared message and context', () => {
      const debugSpy = jest.spyOn(service.logger, 'debug').mockImplementation();
      const message = 'Debugging info';
      const context = 'Test';

      service.debug(message, context);

      expect(debugSpy).toHaveBeenCalledWith({
        message: message,
        context: context,
      });
    });
  });

  describe('verbose', () => {
    it('should call logger.verbose with the prepared message and context', () => {
      const verboseSpy = jest
        .spyOn(service.logger, 'verbose')
        .mockImplementation();
      const message = 'Verbose message';
      const context = 'Test';

      service.verbose(message, context);

      expect(verboseSpy).toHaveBeenCalledWith({
        message: message,
        context: context,
      });
    });
  });
});
