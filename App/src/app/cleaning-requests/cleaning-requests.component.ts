import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { ApiService } from '../app-services/api.service';
import { CleaningRequest } from '../interfaces/Cleaning-request';

@Component({
  selector: 'app-cleaning-requests',
  templateUrl: './cleaning-requests.component.html',
  styleUrls: ['./cleaning-requests.component.css'],
})
export class CleaningRequestsComponent implements OnInit, OnDestroy {
  subscription$!: Subscription;
  cleaningRequests: CleaningRequest[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.subscription$ = this.apiService
      .getCleaningRequests()
      .pipe(
        map((reqs) => {
          const requests: CleaningRequest[] = [];
          for (const key in reqs) {
            if (reqs.hasOwnProperty(key)) {
              requests.push({ ...reqs[key], _id: key });
            }
          }

          return requests;
        })
      )
      .subscribe({
        next: (requests: CleaningRequest[]) => {
          this.cleaningRequests = requests;
          this.isLoading = false;
        },
        error: (error) => console.log(`Error: ${error}`),
      });
  }

  ngOnDestroy(): void {
    if (this.subscription$ !== undefined) {
      this.subscription$.unsubscribe();
    }
  }
}
