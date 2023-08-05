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

    if (email.toLowerCase().includes('admin')) {
      this.emailErrorMessage = 'The email cannot contain admin in it';
      throw new Error('The email cannot contain admin in it');
    }

    this.userService
      .register(email, password)
      .then(() =>
        this.userService
          .login(email, password)
          .then((data) => {
            this.userData = { _id: data.user?.uid, email: data.user?.email };

            this.authService.setUserData(this.userData);

            this.router.navigate(['/']);
          })
          .catch((err) => console.log(err))
      )
      .catch(() => (this.errorMessage = 'Email already exists!'));
  }
}
