import { Inject, Injectable, InjectionToken } from '@angular/core'

export enum LogLevel {
  Error = 0,
  Warn,
  Info
}

export const LogLevelToken = new InjectionToken<LogLevel>("loglevel");
export const ColorToken = new InjectionToken<string>("color");

@Injectable()
export class LoggerService {
  constructor(
    @Inject(LogLevelToken) private logLevel: LogLevel,
    @Inject(ColorToken) private color: string
  ) {}

  info(message: string, file: string, param?: any): void {
    this.logWith(LogLevel.Info, message, file, param);
  }

  warn(message: string, file: string, param?: any): void {
    this.logWith(LogLevel.Warn, message, file, param);
  }

  error(message: string, file: string, param?: any): void {
    this.logWith(LogLevel.Error, message, file, param);
  }

  logWith(level: LogLevel, message: string, file: string, param: any = ''): void {
    if (level <= this.logLevel) {
      switch (level) {
        case LogLevel.Error:
          return console.error("%c " + file + '--' + message, `color: ${this.color}`, param);
        case LogLevel.Warn:
          return console.warn("%c " + file + '--' + message, `color: ${this.color}`, param);
        case LogLevel.Info:
          return console.info("%c " + file + '--' + message, `color: ${this.color}`, param);
      }
    }
  }
}


/*

export enum LogLevel {
  Error = 0,
  Warn = 1,
  Info = 2,
}

@Injectable()
export class LoggerService {
  logLevel = LogLevel.Info

  constructor() {}

  info(message: string, file: string, param?: any): void {
    this.logWith(LogLevel.Info, message, file, param);
  }

  warn(message: string, file: string, param?: any): void {
    this.logWith(LogLevel.Warn, message, file, param);
  }

  error(message: string, file: string, param?: any): void {
    this.logWith(LogLevel.Error, message, file, param);
  }

  private logWith(level: LogLevel, message: string, file: string, param: any = ''): void {
    if (level <= this.logLevel) {
      switch (level) {
        case LogLevel.Error:
          console.error('%c ' + file + '--' + message, `font-weight: bold; color: red`, param);
          break;
        case LogLevel.Warn:
          console.warn('%c ' + file + '--' + message, `font-weight: bold; color: orange`, param);
          break;
        case LogLevel.Info:
          console.info('%c ' + file + '--' + message, `font-weight: bold; color: green`, param);
          break;
      }
    }
  }
}

*/
