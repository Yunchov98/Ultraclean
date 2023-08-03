import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { JobRequest } from '../interfaces/Job-request';
import { ApiService } from '../app-services/api.service';

@Component({
  selector: 'app-job-requests',
  templateUrl: './job-requests.component.html',
  styleUrls: ['./job-requests.component.css'],
})
export class JobRequestsComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  requests: JobRequest[] = [];
  subscription$!: Subscription;

  constructor(
    private apiService: ApiService,
  ) {}

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

  ngOnDestroy(): void {
    if (this.subscription$ !== undefined) {
      this.subscription$.unsubscribe();
    }
  }
}
