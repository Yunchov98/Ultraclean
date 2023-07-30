import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successfully',
  templateUrl: './successfully.component.html',
  styleUrls: ['./successfully.component.css'],
})
export class SuccessfullyComponent {
  constructor(private router: Router) {}

  clickHandler() {
    this.router.navigate(['/'])
  }
}
