import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'

import { AppRoutingModule } from 'src/app/app-routing.module'
import { CoreModule } from 'src/app/core/core.module'
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from 'src/app/shared/shared.module'
import { LoggerService, LogLevel } from './shared/services/logger.service';
import { LoggerModule } from './shared/services/logger.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    LoggerModule.config(LogLevel.Info, "orange"),
  ],
  providers: [LoggerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
