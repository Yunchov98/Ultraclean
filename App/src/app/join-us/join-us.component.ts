import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.css'],
})
export class JoinUsComponent {
  submitHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log('clicked');
  }
}
