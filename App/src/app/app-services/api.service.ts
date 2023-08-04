import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Service } from '../interfaces/Service';
import { JobRequest } from '../interfaces/Job-request';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getBookingServices(): Observable<Service[]> {
    const { firebase } = environment;
    return this.http.get<Service[]>(
      `${firebase.databaseURL}/booking-services.json`
    );
  }

  getJobRequests(): Observable<JobRequest[]> {
    const { firebase } = environment;
    return this.http.get<JobRequest[]>(
      `${firebase.databaseURL}/job-requests.json`
    );
  }

  createService(data: Service): Observable<Service> {
    const { firebase } = environment;

    return this.http.post<Service>(
      `${firebase.databaseURL}/ultraclean-services.json`,
      data
    );
  }
}
