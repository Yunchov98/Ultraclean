import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../app-services/api.service';
import { Service } from '../interfaces/Service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css'],
})
export class ServiceDetailsComponent implements OnInit {
  service!: Service 
  isLoading: boolean = true;

  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    // console.log(this.activeRoute.snapshot.data);
    // this.activeRoute.params.subscribe((v) => console.log(v));
  }

  ngOnInit(): void {
    this.service = this.activeRoute.snapshot.data['service'];
    this.isLoading = false;
    console.log(this.service);
  }
}
