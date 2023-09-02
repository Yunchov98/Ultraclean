import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription, map } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';
import { ApiService } from '../app-services/api.service';
import { AuthService } from '../app-services/auth.service';
import { JobRequest } from '../interfaces/Job-request';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.css'],
})
export class JoinUsComponent implements OnInit, OnDestroy {
  subscription$!: Subscription;
  workersSubscription$!: Subscription;
  jobRequestSubscription$!: Subscription;
  isLoading: boolean = true;
  errorMessage: string = '';
  userData!: User | null;
  isDisabled: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.getUserData();

    this.titleService.setTitle('Ultraclean Join Us');

    this.jobRequestSubscription$ = this.apiService
      .getJobRequests()
      .pipe(
        map((requests) => {
          const requestsArr: JobRequest[] = [];

          for (const key in requests) {
            if (requests.hasOwnProperty(key)) {
              requestsArr.push({ ...requests[key], _id: key });
            }
          }

          return requestsArr;
        })
      )
      .subscribe({
        next: (requestsArr: JobRequest[]) => {
          for (const request of requestsArr) {
            if (request._ownerId === this.userData?._id) {
              this.errorMessage = 'You are already sent a request!';
              this.isDisabled = true;
              return;
            }
          }
        },
        error: (error) => console.log(`Error: ${error}`),
      });

    this.workersSubscription$ = this.apiService
      .getWorkers()
      .pipe(
        map((workers) => {
          const workersArr: JobRequest[] = [];

          for (const key in workers) {
            if (workers.hasOwnProperty(key)) {
              workersArr.push({ ...workers[key], _id: key });
            }
          }

          return workersArr;
        })
      )
      .subscribe({
        next: (workersArr: JobRequest[]) => {
          for (const worker of workersArr) {
            if (worker._ownerId === this.userData?._id) {
              this.errorMessage = 'You are already an employee in our company';
              this.isDisabled = true;
              return;
            }
          }
        },
        error: (error) => console.log(`Error: ${error}`),
      });

    this.isLoading = false;
  }

  submitHandler(jobForm: NgForm) {
    const userData = this.authService.getUserData();

    if (jobForm.invalid) {
      return;
    }

    if (!userData) {
      this.router.navigate(['/error-page']);
      throw new Error('You have to be logged in!');
    }

    if (this.errorMessage === '') {
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

      const jobRequest: JobRequest = {
        _id: uuidv4(),
        _ownerId: userData._id,
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

      this.subscription$ = this.apiService
        .sendJobRequest(jobRequest)
        .subscribe({
          next: () => this.router.navigate(['/uc/successfully']),
          error: (err) => console.log(err),
        });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription$ !== undefined) {
      this.subscription$.unsubscribe();
    }

    if (this.workersSubscription$ !== undefined) {
      this.workersSubscription$.unsubscribe();
    }

    if (this.jobRequestSubscription$ !== undefined) {
      this.jobRequestSubscription$.unsubscribe();
    }
  }
}
