import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { Service } from '../interfaces/Service';
import { ApiService } from '../app-services/api.service';
import { AuthService } from '../app-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ultraclean-services',
  templateUrl: './ultraclean-services.component.html',
  styleUrls: ['./ultraclean-services.component.css'],
})
export class UltracleanServicesComponent implements OnInit, OnDestroy {
  subscribe$!: Subscription;
  deleteSubscription$!: Subscription;

  ultracleanServices: Service[] = [];

  isClicked: boolean = false;
  isLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  isAdmin(): boolean {
    if (
      this.authService
        .getUserData()
        ?.email?.toLowerCase()
        .includes('@admin.com')
    ) {
      return true;
    }

    return false;
  }

  ngOnInit(): void {
    this.subscribe$ = this.apiService
      .getUltracleanServices()
      .pipe(
        map((serv) => {
          const services: Service[] = [];
          for (const key in serv) {
            if (serv.hasOwnProperty(key)) {
              services.push({ ...serv[key], _id: key });
            }
          }

          return services;
        })
      )
      .subscribe({
        next: (services: Service[]) => {
          this.ultracleanServices = services;
          console.log(this.ultracleanServices);
          this.isLoading = false;
        },
        error: (error) => console.log(`Error: ${error}`),
      });
  }

  deleteHandle(id: string) {
    this.deleteSubscription$ = this.apiService
      .deleteUltraCleanService(id)
      .subscribe({
        next: () => {
          if (confirm('Do you really want to delete this service ?')) {
            this.router.navigate(['/successfully']);
          }
        },
        error: (err) => console.log(err),
      });
  }

  toggle(): void {
    this.isClicked = !this.isClicked;
  }

  ngOnDestroy(): void {
    if (this.subscribe$ !== undefined) {
      this.subscribe$.unsubscribe();
    }
  }
}
