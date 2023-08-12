import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { ApiService } from '../app-services/api.service';
import { AuthService } from '../app-services/auth.service';
import { Service } from '../interfaces/Service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
})
export class AddServiceComponent implements OnInit, OnDestroy {
  subscription$!: Subscription;
  errorMessage: string = '';
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Ultraclean Add-Service')

    this.isLoading = false;
  }

  createServiceHandler(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const adminId = this.authService.getUserData()?._id;
    const { service, imageUrl, price, description } = form.value;

    if (Number(price) < 1) {
      throw new Error('Price cannot be 0 or negative number!');
    }

    const serviceData: Service = {
      _id: uuidv4(),
      service: service.trim(),
      imageUrl: imageUrl.trim(),
      price: Number(price),
      description: description.trim(),
      ownerId: adminId?.trim(),
    };

    this.subscription$ = this.apiService.createService(serviceData).subscribe({
      next: () => this.router.navigate(['/uc/successfully']),
      error: (error) => (this.errorMessage = error.message),
    });
  }

  ngOnDestroy(): void {
    if (this.subscription$ !== undefined) {
      this.subscription$.unsubscribe();
    }
  }
}
