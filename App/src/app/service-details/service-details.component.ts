import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
    private authService: AuthService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.service = this.activeRoute.snapshot.data['service'];

    this.titleService.setTitle(`${this.service.service} Details`);

    this.isLoading = false;
  }

  onActive() {
    window.scroll({
      top: 90,
      left: 0,
      behavior: 'smooth',
    });
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
