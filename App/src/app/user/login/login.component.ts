import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from 'src/app/app-services/auth.service';
import { UserService } from 'src/app/app-services/user.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage!: string;
  token: string = '';
  userData!: User;
  isAdmin: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Ultraclean Login');
  }

  loginHandler(loginForm: NgForm): void {
    const { email, password } = loginForm.value;

    this.userService
      .login(email, password)
      .then((data) => {
        data.user
          ?.getIdToken()
          .then((t) => {
            if (data.user?.email === 'admin@admin.com') {
              this.isAdmin = true;
            }

            this.userData = {
              _id: data.user?.uid,
              email: data.user?.email,
              token: t,
              currentOrder: [],
              myOrders: [],
              isAdmin: this.isAdmin,
            };

            this.authService.setUserData(this.userData);
          })
          .catch((err) => console.log(err));

        this.router.navigate(['/home']);
      })
      .catch(() => (this.errorMessage = 'Wrong email or password!'));
  }
}
