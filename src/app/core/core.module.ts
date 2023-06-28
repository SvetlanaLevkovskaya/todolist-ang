import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { CredentialsInterceptor } from 'src/app/core/interceptors/credentials.interceptor'
import { AuthService } from 'src/app/core/services/auth.service'
import { NotificationService } from 'src/app/core/services/notification.service'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
    AuthService,
    NotificationService,
  ],
})
export class CoreModule {}
