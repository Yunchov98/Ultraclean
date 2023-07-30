import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinerComponent } from './spiner/spiner.component';
import { ContactsButtonComponent } from './contacts-button/contacts-button.component';
import { SharedRoutingModule } from './shared-routing.module';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';
import { SuccessfullyComponent } from './successfully/successfully.component';

@NgModule({
  declarations: [SpinerComponent, ContactsButtonComponent, CancelButtonComponent, SuccessfullyComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [SpinerComponent, ContactsButtonComponent, CancelButtonComponent, SuccessfullyComponent],
})
export class SharedModule {}
