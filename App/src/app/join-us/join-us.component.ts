import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';
import { ApiService } from '../app-services/api.service';
import { JobRequest } from '../interfaces/Job-request';
import { AuthService } from '../app-services/auth.service';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.css'],
})
export class JoinUsComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  isLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
  }

  submitHandler(jobForm: NgForm) {
    if (jobForm.invalid) {
      return;
    }

    if (!this.authService.getUserData()) {
      this.router.navigate(['/error-page']);
      throw new Error('You have to be logged in!');
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

    const userId = this.authService.getUserData()?._id;

    const jobRequest: JobRequest = {
      _id: uuidv4(),
      _ownerId: userId,
      firstName,
      lastName,
      lastCompany,
      comments,
      email,
      portfolio,
      salary: Number(salary),
      startDate,
      createAt: new Date().toString(),
    };

    this.subscription = this.apiService.sendJobRequest(jobRequest).subscribe({
      next: () => this.router.navigate(['/successfully']),
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
