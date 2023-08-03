import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../interfaces/User';
import { AuthService } from 'src/app/app-services/auth.service';
import { UserService } from 'src/app/app-services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage!: string;

  userData!: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  loginHandler(loginForm: NgForm): void {
    const { email, password } = loginForm.value;

    this.userService
      .login(email, password)
      .then((data) => {
        this.userData = { _id: data.user?.uid, email: data.user?.email };

        this.authService.setUserData(this.userData);

        this.router.navigate(['/']);
      })
      .catch((err) => (this.errorMessage = 'Wrong email or password!'));
  }
}
