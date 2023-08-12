import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';

import { AuthService } from 'src/app/app-services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getUserData()?.token;

    if (token) {
      request = request.clone({
        setParams: {
          auth: token ? token : '',
        },
      });
    }

    return next.handle(request).pipe(
      tap(() => console.log('successfully')),
      catchError((error: HttpErrorResponse) => {
        console.log('Error:', error);
        if (error.status === 401) {
          this.authService.clearUserData();
          this.router.navigate(['/login'], {
            queryParams: {
              authFailed: true,
            },
          });
        }
        return throwError(error);
      })
    );
  }
}
