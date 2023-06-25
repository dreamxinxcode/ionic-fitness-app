import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getToken()) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getToken())
      });
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.logout();
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}