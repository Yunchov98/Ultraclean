import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription, map } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';
import { Service } from '../interfaces/Service';
import { ApiService } from '../app-services/api.service';
import { CleaningRequest } from '../interfaces/Cleaning-request';
import { AuthService } from '../app-services/auth.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit, OnDestroy {
  subscription$!: Subscription;
  services: Service[] = [];
  selectedServices: Service[] = [];
  request!: CleaningRequest;
  userData!: any;
  isLoading: boolean = true;
  errorMessage: string = '';
  totalPrice: number = 0;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Ultraclean Booking Form')

    this.subscription$ = this.apiService
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
          this.services = services;

          this.isLoading = false;
        },
        error: (error) => console.log(`Error: ${error}`),
      });
  }

  createRequest(bookingForm: NgForm) {
    if (bookingForm.invalid) {
      this.errorMessage = 'Fields with * are required!';

      throw new Error('Fields with * are required!');
    }

    if (this.selectedServices.length < 1) {
      throw new Error('Select a service(s)');
    }

    const user = this.authService.getUserData();
    const userId = user?._id;

    if (user) {
      this.userData = {
        currentOrder: this.selectedServices,
        myOrders: this.selectedServices,
      };
    }

    const { name, email, phone, address, city } = bookingForm.value;

    this.request = {
      _id: uuidv4(),
      _ownerId: userId,
      name,
      email,
      phone,
      address,
      city,
      services: this.selectedServices,
      createdAt: new Date().toString(),
      totalPrice: this.totalPrice,
    };

    this.subscription$ = this.apiService.bookAService(this.request).subscribe({
      next: () => this.router.navigate(['/uc/successfully']),
      error: (error) => console.log(error),
    });
  }

  sumTotalPrice(): number {
    this.totalPrice = this.selectedServices.reduce((total, curService) => {
      return total + curService.price;
    }, 0);

    return 0;
  }

  ngOnDestroy(): void {
    if (this.subscription$ !== undefined) {
      this.subscription$.unsubscribe();
    }
  }
}
