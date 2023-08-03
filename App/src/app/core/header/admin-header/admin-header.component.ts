import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/app-services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logoutHandler(): void {
    this.authService.clearUserData();

    this.router.navigate(['/']);
  }
}
