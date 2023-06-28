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
    this.logWith(LogLevel.Info, message, file, param)
  }

  warn(message: string, file: any, param?: any): void {
    this.logWith(LogLevel.Warn, message, file, param)
  }

  error(message: string, file: any, param?: any): void {
    this.logWith(LogLevel.Error, message, file, param)
  }

  private logWith(level: LogLevel, message: string, file: any, param: any = ''): void {
    if (level <= this.logLevel) {
      switch (level) {
        case LogLevel.Error:
          return console.error('%c ' + file + '--' + message, `color: red`, param)
        case LogLevel.Warn:
          return console.warn('%c ' + file + '--' + message, `color: orange`, param)
        case LogLevel.Info:
          return console.info('%c ' + file + '--' + message, `color: green`, param)
      }
    }
  }
}
