import { Component } from '@angular/core';
import { AuthService } from 'src/app/app-services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  isAdmin(): boolean {
    if (
      this.authService.getUserData()?.email?.toLowerCase().includes('admin')
    ) {
      return true;
    }

    return false;
  }

  isUser(): boolean {
    if (
      !this.authService.getUserData()?.email?.toLowerCase().includes('admin')
    ) {
      return true;
    }

    return false;
  }
}
