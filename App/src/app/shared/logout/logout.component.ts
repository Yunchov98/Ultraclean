import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/app-services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {}
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  logoutHandler() {
    this.authService.clearUserData();

    this.router.navigate(['/']);
  }
}
