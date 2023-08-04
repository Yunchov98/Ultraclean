import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { Service } from '../interfaces/Service';
import { ApiService } from '../app-services/api.service';
import { AuthService } from '../app-services/auth.service';

@Component({
  selector: 'app-ultraclean-services',
  templateUrl: './ultraclean-services.component.html',
  styleUrls: ['./ultraclean-services.component.css'],
})
export class UltracleanServicesComponent implements OnInit, OnDestroy {
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  services: Service[] = [];
  subscribe$!: Subscription;
  isClicked: boolean = false;
  isLoading: boolean = true;

  isAdmin(): boolean {
    if (
      this.authService.getUserData()?.email?.toLowerCase().includes('admin')
    ) {
      return true;
    }

    return false;
  }

  ngOnInit(): void {
    this.subscribe$ = this.apiService
      .getCleaningRequests()
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
          this.services = services;
          this.isLoading = false;
        },
        error: (error) => console.log(`Error: ${error}`),
      });
  }

  toggle(): void {
    this.isClicked = !this.isClicked;
  }

  ngOnDestroy(): void {
    if (this.subscribe$ !== undefined) {
      console.log('unsub');
      this.subscribe$.unsubscribe();
    }
  }
}
