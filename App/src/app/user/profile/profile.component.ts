import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { ApiService } from 'src/app/app-services/api.service';
import { AuthService } from 'src/app/app-services/auth.service';
import { AcceptedRequest } from 'src/app/interfaces/Accepted-request';
import { CleaningRequest } from 'src/app/interfaces/Cleaning-request';
import { FinishedRequest } from 'src/app/interfaces/Finished-request';
import { RejectedRequest } from 'src/app/interfaces/Rejected-request';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscription$!: Subscription;
  finishedRequestsSubscription$!: Subscription;
  finishRequestSubscription$!: Subscription;
  rejectedRequestsSubscription$!: Subscription;

  requests: CleaningRequest[] = [];
  acceptedRequests: AcceptedRequest[] = [];
  finishedRequest!: FinishedRequest;
  finishedRequests: FinishedRequest[] = [];
  rejectedRequests: RejectedRequest[] = [];

  isLoading: boolean = true;
  isShown: boolean = false;

  totalRequests: number = 0;
  totalFinishedRequests: number = 0;
  totalAcceptedRequests: number = 0;
  totalRejectedRequests: number = 0;
  totalSum: number = 0;

  user: User | null = this.authService.getUserData();

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    if (this.user?.isAdmin) {
      this.adminView();
    } else {
      this.userView();
    }

    this.titleService.setTitle('Profile')

    this.finishedRequestsSubscription$ = this.apiService
      .getFinishedRequests()
      .pipe(
        map((requests) => {
          const finishedRequestsArr: FinishedRequest[] = [];

          for (const key in requests) {
            if (requests.hasOwnProperty(key)) {
              finishedRequestsArr.push({ ...requests[key], _id: key });
            }
          }

          return finishedRequestsArr;
        })
      )
      .subscribe({
        next: (finishedRequestsArr: FinishedRequest[]) => {
          if (this.user?.isAdmin) {
            for (const req of finishedRequestsArr) {
              this.totalSum += req.totalPrice;
            }

            this.finishedRequests = finishedRequestsArr;
            this.totalFinishedRequests = this.finishedRequests.length;
          } else {
            for (const req of finishedRequestsArr) {
              if (req._ownerId === this.user?._id) {
                this.finishedRequests.push(req);
                this.totalFinishedRequests = this.finishedRequests.length;
                this.totalSum += req.totalPrice;
              }
            }
          }

          this.isLoading = false;
        },
        error: (error) => console.log(`Error: ${error}`),
      });

    this.rejectedRequestsSubscription$ = this.apiService
      .getRejectedRequests()
      .pipe(
        map((requests) => {
          const rejectedRequestsArr: RejectedRequest[] = [];

          for (const key in requests) {
            if (requests.hasOwnProperty(key)) {
              rejectedRequestsArr.push({ ...requests[key], _id: key });
            }
          }

          return rejectedRequestsArr;
        })
      )
      .subscribe({
        next: (rejectedRequestsArr: RejectedRequest[]) => {
          if (this.user?.isAdmin) {
            this.rejectedRequests = rejectedRequestsArr;
            this.totalRejectedRequests = this.rejectedRequests.length;
          } else {
            for (const req of rejectedRequestsArr) {
              if (req._ownerId === this.user?._id) {
                this.rejectedRequests.push(req);
                this.totalRejectedRequests = this.rejectedRequests.length;
              }
            }
          }

          this.isLoading = false;
        },
        error: (error) => console.log(`Error: ${error}`),
      });
  }

  userView() {
    this.subscription$ = this.apiService
      .getCleaningRequests()
      .pipe(
        map((requests) => {
          const requestsArr: CleaningRequest[] = [];

          for (const key in requests) {
            if (requests.hasOwnProperty(key)) {
              requestsArr.push({ ...requests[key], _id: key });
            }
          }

          return requestsArr;
        })
      )
      .subscribe({
        next: (requestsArr: CleaningRequest[]) => {
          for (const req of requestsArr) {
            if (req._ownerId === this.user?._id) {
              this.requests.push(req);
            }
          }

          this.totalRequests = this.requests.length;
          this.isLoading = false;
        },
        error: (error) => console.log(`Error: ${error}`),
      });
  }

  adminView() {
    this.subscription$ = this.apiService
      .getAcceptedRequests()
      .pipe(
        map((requests) => {
          const acceptedRequestsArr: AcceptedRequest[] = [];

          for (const key in requests) {
            if (requests.hasOwnProperty(key)) {
              acceptedRequestsArr.push({ ...requests[key], _id: key });
            }
          }

          return acceptedRequestsArr;
        })
      )
      .subscribe({
        next: (acceptedRequestsArr: AcceptedRequest[]) => {
          this.acceptedRequests = acceptedRequestsArr;

          this.totalAcceptedRequests = this.acceptedRequests.length;
          this.isLoading = false;
        },
        error: (error) => console.log(`Error: ${error}`),
      });
  }

  finishRequest(id: string) {
    this.finishRequestSubscription$ = this.apiService
      .getAcceptedRequestById(id)
      .subscribe({
        next: (data) => {
          this.finishedRequest = { ...data, finishedAt: new Date().toString() };

          this.apiService.addFinishedRequest(this.finishedRequest).subscribe({
            next: () =>
              this.apiService.deleteAcceptedRequest(id).subscribe({
                next: () => this.router.navigate(['/uc/successfully']),
                error: (err) => console.log(err),
              }),
            error: (err) => console.log(err),
          });
        },
        error: (err) => console.log(err),
      });
  }

  toggleHandler() {
    this.isShown = !this.isShown;
  }

  ngOnDestroy(): void {
    if (this.subscription$ !== undefined) {
      this.subscription$.unsubscribe();
    }

    if (this.finishedRequestsSubscription$ !== undefined) {
      this.finishedRequestsSubscription$.unsubscribe();
    }

    if (this.finishRequestSubscription$ !== undefined) {
      this.finishRequestSubscription$.unsubscribe();
    }
  }
}
