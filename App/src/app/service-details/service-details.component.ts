import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../app-services/auth.service';
import { Service } from '../interfaces/Service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css'],
})
export class ServiceDetailsComponent implements OnInit {
  service!: Service;
  isLoading: boolean = true;

  constructor(
    private activeRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.service = this.activeRoute.snapshot.data['service'];

    this.isLoading = false;
  }

  isAdmin() {
    if (
      this.authService.getUserData()?.email?.toLowerCase().includes('admin')
    ) {
      return true;
    }

    return false;
  }
}
