import { Injectable } from '@angular/core'

export enum LogLevel {
  Error = 0,
  Warn = 1,
  Info = 2,
}

@Injectable()
export class LoggerService {
  constructor() {}

  logLevel = LogLevel.Info

  info(message: string, file: any, param?: any): void {
    if (this.logLevel >= LogLevel.Info) {
      this.logWith(LogLevel.Info, message, file, param);
    }
  }

  warn(message: string, file: any, param?: any): void {
    if (this.logLevel > LogLevel.Warn) {
      this.logWith(LogLevel.Warn, message, file, param);
    }
  }

  error(message: string, file: any, param?: any): void {
    if (this.logLevel >= LogLevel.Error) {
      this.logWith(LogLevel.Error, message, file, param);
    }
  }

  private logWith(level: LogLevel, message: string, file: any, param: any = ''): void {
    switch (level) {
      case LogLevel.Error:
        console.error('%c ' + file + '--' + message, `color: red`, param)
        break
      case LogLevel.Warn:
        console.warn('%c ' + file + '--' + message, `color: orange`, param)
        break
      case LogLevel.Info:
        console.info('%c ' + file + '--' + message, `color: green`, param)
        break
    }
  }
}

