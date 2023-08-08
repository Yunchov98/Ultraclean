import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/app-services/api.service';
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
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  registerHandler(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }

    const { email, password } = registerForm.value;

    if (email.toLowerCase().includes('admin')) {
      this.emailErrorMessage = 'The email cannot contain admin in it';
      throw new Error('The email cannot contain admin in it');
    }

    this.userService
      .register(email, password)
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

            this.apiService.addUser(this.userData).subscribe({
              next: () => this.router.navigate(['/successfully']),
              error: (err) => console.log(err),
            });
          })
          .catch((err) => console.log(err));
      })
      .catch(() => (this.errorMessage = 'This email already exist!'));
  }
}
