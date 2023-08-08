import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class isAdminGuard implements CanActivate {
  email: string = '';

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('userData');
    if (token) {
      this.email = JSON.parse(token).email;
    }

    if (this.email === 'admin@admin.com') {
      return true;
    }

    return this.router.createUrlTree(['/error-page']);
  }
}
