import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private titleService: Title){}

  ngOnInit(): void {
    this.titleService.setTitle('Ultraclean About')

    this.isLoading = false;
  }
}
