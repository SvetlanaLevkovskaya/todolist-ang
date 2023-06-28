import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'

import { AppRoutingModule } from 'src/app/app-routing.module'
import { CoreModule } from 'src/app/core/core.module'
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from 'src/app/shared/shared.module'
import { LogTestComponent } from '../log-test/log-test.component';
import { LogService } from '../shared/log.service';

@NgModule({
  declarations: [AppComponent, LogTestComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, HttpClientModule, SharedModule],
  providers: [LogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
