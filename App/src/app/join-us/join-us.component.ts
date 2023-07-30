import { Component } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.css'],
})
export class JoinUsComponent {
  constructor(private database: Database, private router: Router) {}

  submitHandler(jobForm: NgForm) {
    if (jobForm.invalid) {
      return;
    }

    const {
      comments,
      email,
      firstName,
      lastCompany,
      lastName,
      portfolio,
      salary,
      startDate,
    } = jobForm.value;

    set(ref(this.database, 'job-requests/' + uuidv4()), {
      comments,
      email,
      firstName,
      lastCompany,
      lastName,
      portfolio,
      salary: Number(salary),
      startDate,
    });

    this.router.navigate(['/succesfully']);
  }
}
