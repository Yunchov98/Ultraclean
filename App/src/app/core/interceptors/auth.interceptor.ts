import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/app-services/auth.service';
import { Router } from '@angular/router';

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
          auth: token ?? '',
        },
      });
    }

    // request = request.clone({
    //   setHeaders: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    return next.handle(request).pipe(
      tap(() => console.log('succesfully')),
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
