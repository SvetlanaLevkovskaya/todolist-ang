import { ModuleWithProviders, NgModule } from "@angular/core";
import {
  ColorToken,
  LoggerService,
  LogLevel,
  LogLevelToken
} from "./logger.service";

@NgModule()
export class LoggerModule {
  static config(
    logLevel: LogLevel,
    color: string
  ): ModuleWithProviders<LoggerModule> {
    return {
      ngModule: LoggerModule,
      providers: [
        LoggerService,
        { provide: LogLevelToken, useValue: logLevel },
        { provide: ColorToken, useValue: color }
      ]
    };
  }
}
