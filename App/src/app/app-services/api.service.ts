import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Service } from '../interfaces/Service';
import { JobRequest } from '../interfaces/Job-request';
import { CleaningRequest } from '../interfaces/Cleaning-request';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUltracleanServices(): Observable<Service[]> {
    const { firebase } = environment;
    return this.http.get<Service[]>(
      `${firebase.databaseURL}/ultraclean-services.json`
    );
  }

  getCleaningRequests(): Observable<CleaningRequest[]> {
    const { firebase } = environment;
    return this.http.get<CleaningRequest[]>(
      `${firebase.databaseURL}/cleaning-requests.json`
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

  bookAService(data: CleaningRequest): Observable<CleaningRequest> {
    const { firebase } = environment;

    return this.http.post<CleaningRequest>(
      `${firebase.databaseURL}/cleaning-requests.json`,
      data
    );
  }
}
