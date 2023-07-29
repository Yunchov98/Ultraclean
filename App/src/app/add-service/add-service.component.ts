import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
})
export class AddServiceComponent {
  addServiceHandler(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    console.log('clicked');
  }
  
}
