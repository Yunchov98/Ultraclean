import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { isGuesttGuard } from '../core/guards/is-guest.guard';
import { isUserGuard } from '../core/guards/is-user.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [isGuesttGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [isGuesttGuard],
    component: RegisterComponent,
  },
  {
    path: 'profile',
    canActivate: [isUserGuard],
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
