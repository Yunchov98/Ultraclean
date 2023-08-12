import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Ultraclean Products');
    this.isLoading = false;
  }
}
