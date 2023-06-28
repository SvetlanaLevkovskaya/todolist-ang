import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/core/services/auth.service'

@Component({
  selector: 'tl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.me()
  }
}
