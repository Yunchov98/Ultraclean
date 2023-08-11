import { Component, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { ApiService } from '../app-services/api.service';
import { JobRequest } from '../interfaces/Job-request';
import { AuthService } from '../app-services/auth.service';
import { User } from '../interfaces/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css'],
})
export class WorkersComponent implements OnInit {
  subscription$!: Subscription;
  releaseSubscription$!: Subscription;
  workers: JobRequest[] = [];
  isLoading: boolean = true;
  allWorkers: number = 0;
  userData!: User | null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.getUserData();

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
      next: () => this.router.navigate(['/successfully']),
      error: (err) => console.log(err),
    });
  }
}
