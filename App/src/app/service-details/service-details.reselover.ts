import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Service } from '../interfaces/Service';
import { ApiService } from '../app-services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceResolver implements Resolve<Service> {
  constructor(private apiService: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Service | Observable<Service> | Promise<Service> {
    return this.apiService.getServiceById(route.params['id']);
  }
}
