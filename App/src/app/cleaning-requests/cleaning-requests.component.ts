import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { ApiService } from '../app-services/api.service';
import { CleaningRequest } from '../interfaces/Cleaning-request';
import { AcceptedRequest } from '../interfaces/Accepted-request';
import { Router } from '@angular/router';
import { RejectedRequest } from '../interfaces/Rejected-request';

@Component({
  selector: 'app-cleaning-requests',
  templateUrl: './cleaning-requests.component.html',
  styleUrls: ['./cleaning-requests.component.css'],
})
export class CleaningRequestsComponent implements OnInit, OnDestroy {
  subscription$!: Subscription;
  acceptRequestSubscription$!: Subscription;
  rejectRequestSubscription$!: Subscription;
  cleaningRequests: CleaningRequest[] = [];
  isLoading = true;
  acceptedRequest!: AcceptedRequest;
  rejectedRequest!: RejectedRequest;

  constructor(private apiService: ApiService, private router: Router) {}

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

  acceptRequest(id: string) {
    this.acceptRequestSubscription$ = this.apiService
      .getCleaningRequestById(id)
      .subscribe({
        next: (data) => {
          this.acceptedRequest = { ...data, acceptedAt: new Date().toString() };

          this.apiService.acceptRequest(this.acceptedRequest).subscribe({
            next: () =>
              this.apiService.deleteCleaningRequest(id).subscribe({
                next: () => this.router.navigate(['/profile']),
                error: (err) => console.log(err),
              }),
            error: (err) => console.log(err),
          });
        },
        error: (err) => console.log(err),
      });
    console.log(id);
  }

  rejectRequest(id: string) {
    this.rejectRequestSubscription$ = this.apiService
      .getCleaningRequestById(id)
      .subscribe({
        next: (data) => {
          this.rejectedRequest = { ...data, rejectedAt: new Date().toString() };

          this.apiService.addRejectedRequest(this.rejectedRequest).subscribe({
            next: () =>
              this.apiService.deleteCleaningRequest(id).subscribe({
                next: () => this.router.navigate(['/profile']),
                error: (err) => console.log(err),
              }),
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
  }
}
