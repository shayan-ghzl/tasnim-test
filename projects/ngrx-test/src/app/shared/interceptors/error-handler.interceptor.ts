import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        console.log('%cMy Object:', 'color:#0000ff;font-weight:bold;font-size:16px;', error);
        if (error) {
          if (error.status === 400) {
            // this.toastr.error('Error 400', error.status);
          }
          else if (error.status === 401) {
            // this.toastr.error('اطلاعات کاربری شما منقضی شده. لطفا مجدد وارد شوید.', error.status);

            localStorage.removeItem('token');
            this.router.navigateByUrl('/login');

          }
        }
        return of(error);
      })
    );
  }
}
