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
  token: string = '';
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
        data.user
          ?.getIdToken()
          .then((t) => {
            this.userData = {
              _id: data.user?.uid,
              email: data.user?.email,
              token: t,
            };
            this.authService.setUserData(this.userData);
          })
          .catch((err) => console.log(err));
        

        

        this.router.navigate(['/']);
      })
      .catch(() => (this.errorMessage = 'Wrong email or password!'));
  }
}
