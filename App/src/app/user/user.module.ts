import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { LoginComponent } from './login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register.component';
import { environment } from 'src/environments/environment';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent,],
  imports: [CommonModule, UserRoutingModule, FormsModule, SharedModule],
  exports: [LoginComponent, RegisterComponent, ProfileComponent],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
})
export class UserModule {}
