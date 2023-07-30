import { Component, OnInit } from '@angular/core';
import { Database, onValue, ref } from '@angular/fire/database';

import { Service } from '../interfaces/service';

@Component({
  selector: 'app-ultraclean-services',
  templateUrl: './ultraclean-services.component.html',
  styleUrls: ['./ultraclean-services.component.css'],
})
export class UltracleanServicesComponent implements OnInit {
  constructor(private database: Database) {}
  services: Service[] = [];
  isClicked = false;
  isLoading = true;

  ngOnInit(): void {
    const starCountRef = ref(this.database, 'booking-services');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      Object.keys(data).forEach((key) => {
        this.services.push(data[key]);
      });

      this.isLoading = false;
      console.log(this.services);
    });
  }

  toggle(): void {
    this.isClicked = !this.isClicked;
  }
}
