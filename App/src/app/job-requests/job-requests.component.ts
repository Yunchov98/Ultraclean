import { Component, OnInit } from '@angular/core';
import { Database, onValue, ref } from '@angular/fire/database';
import { JobRequest } from '../interfaces/job-request';

@Component({
  selector: 'app-job-requests',
  templateUrl: './job-requests.component.html',
  styleUrls: ['./job-requests.component.css'],
})
export class JobRequestsComponent implements OnInit {
  constructor(private database: Database) {}

  isLoading:boolean = true;
  requests: JobRequest[] = [];

  ngOnInit(): void {
    const starCountRef = ref(this.database, 'job-requests/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      Object.keys(data).forEach((key) => {
        this.requests.push(data[key]);
      });

      this.isLoading = false;
    });
  }
}
