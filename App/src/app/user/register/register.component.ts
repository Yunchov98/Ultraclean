import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/app-services/auth.service';
import { UserService } from 'src/app/app-services/user.service';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  errorMessage: string = '';
  userData!: User;
  emailErrorMessage: string = '';
  token: string = '';
  user!: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  registerHandler(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }

    const { email, password } = registerForm.value;

    this.userService
      .register(email, password)
      .then((data) => {
        console.log(data);
        data.user
          ?.getIdToken()
          .then((t) => {
            this.userData = {
              _id: data.user?.uid,
              email: data.user?.email,
              token: t,
              currentOrder: [],
              myOrders: [],
              isAdmin: false,
            };

            this.authService.setUserData(this.userData);

            this.userService.addUser(this.userData).subscribe({
              next: () => this.router.navigate(['/successfully']),
              error: (err) => console.log(err),
            });
          })
          .catch((err) => console.log(err));
      })
      .catch(() => (this.errorMessage = 'This email already exist!'));
  }
}
