import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { CACHE_OPTION } from '../services/api.service';

@Injectable()
export class AttachTokenInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // way two
    // console.log(request.context.get(CACHE_OPTION));

    if (this.storageService.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.storageService.token}`
        }
      });
    }

    return next.handle(request);
  }
}
