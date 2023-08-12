import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-successfully',
  templateUrl: './successfully.component.html',
  styleUrls: ['./successfully.component.css'],
})
export class SuccessfullyComponent implements OnInit {
  constructor(private router: Router, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Successfully');
  }

  clickHandler() {
    this.router.navigate(['/']);
  }
}
