import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SpinerComponent } from './spiner/spiner.component';
import { ContactsButtonComponent } from './contacts-button/contacts-button.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';
import { SuccessfullyComponent } from './successfully/successfully.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    SpinerComponent,
    ContactsButtonComponent,
    CancelButtonComponent,
    SuccessfullyComponent,
    LogoutComponent,
  ],
  imports: [CommonModule, SharedRoutingModule],
  exports: [
    SpinerComponent,
    ContactsButtonComponent,
    CancelButtonComponent,
    SuccessfullyComponent,
    LogoutComponent,
  ],
})
export class SharedModule {}
