import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './components/login/login.component'
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, RouterModule],
})
export class AuthModule {}
