import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Service } from '../interfaces/Service';
import { JobRequest } from '../interfaces/Job-request';
import { CleaningRequest } from '../interfaces/Cleaning-request';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = environment.firebase.databaseURL;

  constructor(private http: HttpClient) {}

  getUltracleanServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/ultraclean-services.json`);
  }

  getServiceById(id: string): Observable<Service> {
    return this.http.get<Service>(
      `${this.apiUrl}/ultraclean-services/${id}.json`
    );
  }

  createService(data: Service): Observable<Service> {
    return this.http.post<Service>(
      `${this.apiUrl}/ultraclean-services.json`,
      data
    );
  }

  editService(serviceId: string, data: Service): Observable<Service> {
    return this.http.put<Service>(
      `${this.apiUrl}/ultraclean-services/${serviceId}.json`,
      data
    );
  }

  bookAService(data: CleaningRequest): Observable<CleaningRequest> {
    return this.http.post<CleaningRequest>(
      `${this.apiUrl}/cleaning-requests.json`,
      data
    );
  }

  getCleaningRequests(): Observable<CleaningRequest[]> {
    return this.http.get<CleaningRequest[]>(
      `${this.apiUrl}/cleaning-requests.json`
    );
  }

  getJobRequests(): Observable<JobRequest[]> {
    return this.http.get<JobRequest[]>(`${this.apiUrl}/job-requests.json`);
  }

  sendJobRequest(data: JobRequest): Observable<JobRequest> {
    return this.http.post<JobRequest>(`${this.apiUrl}/job-requests.json`, data);
  }

  addUser(userData: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users.json`, userData);
  }
}
