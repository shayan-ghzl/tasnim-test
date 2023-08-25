import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          if (error.status == 503) {
            this.storageService.removeMainToken();
            this.router.navigateByUrl('/login');
          }
        }
        return throwError(() => new Error('There is an error'));
      })
    );
  }
}
