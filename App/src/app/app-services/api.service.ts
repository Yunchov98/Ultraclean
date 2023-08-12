import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Service } from '../interfaces/Service';
import { JobRequest } from '../interfaces/Job-request';
import { CleaningRequest } from '../interfaces/Cleaning-request';
import { AcceptedRequest } from '../interfaces/Accepted-request';
import { FinishedRequest } from '../interfaces/Finished-request';
import { RejectedRequest } from '../interfaces/Rejected-request';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = environment.firebase.databaseURL;

  constructor(private http: HttpClient) {}

  getUltracleanServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/ultraclean-services.json`);
  }

  deleteUltraCleanService(id: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/ultraclean-services/${id}.json`);
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

  getCleaningRequestById(id: string): Observable<CleaningRequest> {
    return this.http.get<CleaningRequest>(
      `${this.apiUrl}/cleaning-requests/${id}.json`
    );
  }

  getJobRequests(): Observable<JobRequest[]> {
    return this.http.get<JobRequest[]>(`${this.apiUrl}/job-requests.json`);
  }

  getJobRequestById(id: string): Observable<JobRequest> {
    return this.http.get<JobRequest>(`${this.apiUrl}/job-requests/${id}.json`);
  }

  sendJobRequest(data: JobRequest): Observable<JobRequest> {
    return this.http.post<JobRequest>(`${this.apiUrl}/job-requests.json`, data);
  }

  deleteJobRequest(id: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/job-requests/${id}.json`);
  }

  acceptRequest(data: AcceptedRequest): Observable<AcceptedRequest> {
    return this.http.post<AcceptedRequest>(
      `${this.apiUrl}/accepted-requests.json`,
      data
    );
  }

  getAcceptedRequests(): Observable<AcceptedRequest[]> {
    return this.http.get<AcceptedRequest[]>(
      `${this.apiUrl}/accepted-requests.json`
    );
  }

  getAcceptedRequestById(id: string): Observable<AcceptedRequest> {
    return this.http.get<AcceptedRequest>(
      `${this.apiUrl}/accepted-requests/${id}.json`
    );
  }

  deleteAcceptedRequest(id: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/accepted-requests/${id}.json`);
  }

  addFinishedRequest(data: FinishedRequest): Observable<FinishedRequest> {
    return this.http.post<FinishedRequest>(
      `${this.apiUrl}/finished-requests.json`,
      data
    );
  }

  getFinishedRequests(): Observable<FinishedRequest[]> {
    return this.http.get<FinishedRequest[]>(
      `${this.apiUrl}/finished-requests.json`
    );
  }

  deleteCleaningRequest(id: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/cleaning-requests/${id}.json`);
  }

  addRejectedRequest(data: RejectedRequest): Observable<RejectedRequest> {
    return this.http.post<RejectedRequest>(
      `${this.apiUrl}/rejected-requests.json`,
      data
    );
  }

  getRejectedRequests(): Observable<RejectedRequest[]> {
    return this.http.get<RejectedRequest[]>(
      `${this.apiUrl}/rejected-requests.json`
    );
  }

  addWorker(data: JobRequest): Observable<JobRequest> {
    return this.http.post<JobRequest>(`${this.apiUrl}/workers.json`, data);
  }

  getWorkers(): Observable<JobRequest[]> {
    return this.http.get<JobRequest[]>(`${this.apiUrl}/workers.json`);
  }

  deleteWorker(id: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/workers/${id}.json`);
  }
}
