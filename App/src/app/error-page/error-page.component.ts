import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../app-services/auth.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Ultraclean Error Page');

    this.isLoggedIn = this.authService.isLoggedIn;
  }
}
