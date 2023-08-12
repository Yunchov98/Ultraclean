import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { Service } from '../interfaces/Service';
import { ApiService } from '../app-services/api.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css'],
})
export class EditServiceComponent implements OnInit, OnDestroy {
  service!: Service;
  subscription!: Subscription;
  isLoading: boolean = true;

  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.service = this.activeRoute.snapshot.data['service'];

    this.titleService.setTitle(`${this.service.service} Edit`);

    this.isLoading = false;
  }

  updateService(editForm: NgForm): void {
    const serviceId = this.activeRoute.snapshot.params['id'];

    this.subscription = this.apiService
      .editService(serviceId, editForm.value)
      .subscribe({
        next: () =>
          this.router.navigate(['/service', 'details', `${serviceId}`]),
        error: (err) => console.log(err),
      });
  }

  onActive() {
    window.scroll({
      top: 90,
      left: 0,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
