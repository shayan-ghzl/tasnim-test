import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthStatus, StorageService } from '../services/storage.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.headers.has('usedforauthstatus')) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          if (error.status == 401) {
            console.log(error);
            this.storageService.removeMainToken();
            this.storageService.token = null;
            this.storageService.authenticationStatus = AuthStatus.reject;
            this.router.navigateByUrl('/login');
          }
        }
        return throwError(() => new Error('There is an error'));
      })
    );
  }
}
