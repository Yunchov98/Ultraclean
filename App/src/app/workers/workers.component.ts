import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { ApiService } from '../app-services/api.service';
import { JobRequest } from '../interfaces/Job-request';
import { AuthService } from '../app-services/auth.service';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css'],
})
export class WorkersComponent implements OnInit, OnDestroy {
  subscription$!: Subscription;
  releaseSubscription$!: Subscription;
  workers: JobRequest[] = [];
  isLoading: boolean = true;
  allWorkers: number = 0;
  userData!: User | null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.getUserData();

    this.titleService.setTitle('Our Employees')

    this.subscription$ = this.apiService
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
          this.workers = workersArr;
          this.allWorkers = workersArr.length;
          this.isLoading = false;
        },
        error: (error) => console.log(`Error: ${error}`),
      });
  }

  releaseHandle(id: string) {
    this.releaseSubscription$ = this.apiService.deleteWorker(id).subscribe({
      next: () => this.router.navigate(['/uc/successfully']),
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    if (this.subscription$ !== undefined) {
      this.subscription$.unsubscribe();
    }

    if (this.releaseSubscription$ !== undefined) {
      this.releaseSubscription$.unsubscribe();
    }
  }
}
