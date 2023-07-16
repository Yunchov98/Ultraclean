import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrls: ['./cancel-button.component.css'],
})
export class CancelButtonComponent {
  constructor(private router: Router) {}

  close() {
    this.router.navigate(['/']);
  }
}
