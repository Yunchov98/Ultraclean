import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { LoginComponent } from './login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, UserRoutingModule, FormsModule],
  exports: [LoginComponent, RegisterComponent],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
})
export class UserModule {}
