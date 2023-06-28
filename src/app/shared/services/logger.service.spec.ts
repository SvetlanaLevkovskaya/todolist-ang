import { LoggerService, LogLevel } from './logger.service';

it('test_info_method_calls_logWith_with_correct_log_level', () => {
  const loggerService = new LoggerService(LogLevel.Info, 'orange');
  spyOn(loggerService, 'logWith');

  loggerService.info('test message', 'test file', 'test param');

  expect(loggerService.logWith).toHaveBeenCalledWith(LogLevel.Info, 'test message', 'test file', 'test param');
});

it('test_warn_method_calls_logWith_with_correct_log_level', () => {
  const loggerService = new LoggerService(LogLevel.Warn, 'orange');
  spyOn(loggerService, 'logWith');

  loggerService.warn('test message', 'test file', 'test param');

  expect(loggerService.logWith).toHaveBeenCalledWith(LogLevel.Warn, 'test message', 'test file', 'test param');
});

it('test_error_method_calls_logWith_with_correct_log_level', () => {
  const loggerService = new LoggerService(LogLevel.Error, 'orange');
  spyOn(loggerService, 'logWith');

  loggerService.error('test message', 'test file', 'test param');

  expect(loggerService.logWith).toHaveBeenCalledWith(LogLevel.Error, 'test message', 'test file', 'test param');
});

it('test_logWith_does_not_log_if_log_level_is_higher_than_set_log_level', () => {
  const loggerService = new LoggerService(LogLevel.Warn, 'orange');
  spyOn(console, 'info');
  spyOn(console, 'warn');
  spyOn(console, 'error');

  loggerService.info('test message', 'test file', 'test param');
  loggerService.warn('test message', 'test file', 'test param');
  loggerService.error('test message', 'test file', 'test param');

  expect(console.info).not.toHaveBeenCalled();
  expect(console.warn).toHaveBeenCalled();
  expect(console.error).toHaveBeenCalled();
});

it('test_logWith_logs_message_with_empty_param_if_param_is_not_provided', () => {
  const loggerService = new LoggerService(LogLevel.Info, 'orange');
  spyOn(console, 'info');

  loggerService.info('test message', 'test file');

  expect(console.info).toHaveBeenCalledWith('%c test file--test message', `color: orange`, '');
});

it('test_LoggerService_is_correctly_injected_with_LogLevelToken_and_ColorToken', () => {
  const loggerService = new LoggerService(LogLevel.Info, 'orange');

  expect(loggerService).toBeTruthy();
});
