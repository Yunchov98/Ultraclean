import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../app-services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Ultraclean');
  }

  onActive() {
    window.scroll({
      top: 90,
      left: 0,
      behavior: 'smooth',
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  isAdmin(): boolean {
    if (this.authService.getUserData()?.isAdmin) {
      return true;
    }

    return false;
  }
}
