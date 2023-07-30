import { Component } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
})
export class AddServiceComponent {
  constructor(private database: Database, private router: Router) {}

  addServiceHandler(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { service, imageUrl, price, description } = form.value;

    set(ref(this.database, 'booking-services/' + service), {
      service,
      imageUrl,
      price: Number(price),
      description,
    });

    this.router.navigate(['/succesfully']);
  }
}
