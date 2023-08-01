import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ref, onValue, Database } from '@angular/fire/database';
import { Service } from '../interfaces/service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  constructor(private database: Database) {}

  services: Service[] = [];
  isLoading: boolean = true;
  selectedServices: string[] = [];

  ngOnInit(): void {
    const starCountRef = ref(this.database, 'booking-services');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      Object.keys(data).forEach((key) => {
        this.services.push(data[key]);
      });

      this.isLoading = false;
    });
  }
}
