import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { JobRequest } from '../interfaces/Job-request';
import { ApiService } from '../app-services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-requests',
  templateUrl: './job-requests.component.html',
  styleUrls: ['./job-requests.component.css'],
})
export class JobRequestsComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  requests: JobRequest[] = [];
  subscription$!: Subscription;
  requestSubscription$!: Subscription;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.subscription$ = this.apiService
      .getJobRequests()
      .pipe(
        map((req: JobRequest[]) => {
          const requests: JobRequest[] = [];
          for (const key in req) {
            if (req.hasOwnProperty(key)) {
              requests.push({ ...req[key], _id: key });
            }
          }

          return requests;
        })
      )
      .subscribe({
        next: (requests: JobRequest[]) => {
          this.requests = requests;
          this.isLoading = false;
        },
        error: (error: Error) => console.log(`Error: ${error}`),
      });
  }

  acceptHandle(requestId: string) {
    this.requestSubscription$ = this.apiService
      .getJobRequestById(requestId)
      .subscribe({
        next: (request) => {
          this.apiService.addWorker(request).subscribe({
            next: () => {
              this.apiService.deleteJobRequest(requestId).subscribe({
                next: () => this.router.navigate(['/successfully']),
                error: (err) => console.log(err),
              });
            },
            error: (err) => console.log(err),
          });
        },
        error: (err) => console.log(err),
      });
  }

  ngOnDestroy(): void {
    if (this.subscription$ !== undefined) {
      this.subscription$.unsubscribe();
    }

    if (this.requestSubscription$ !== undefined) {
      this.requestSubscription$.unsubscribe();
    }
  }
}
