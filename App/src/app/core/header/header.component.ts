import { Component } from '@angular/core';

import { AuthService } from 'src/app/app-services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  isAdmin(): boolean {
    if (this.authService.getUserData()?.isAdmin) {
      return true;
    }

    return false;
  }
}
