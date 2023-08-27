import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/ngrx-test/src/environments/environment';
import { Observable, catchError, of, tap, timeout } from 'rxjs';
import { IResponse, ITaxParam } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  signup(param: {
    email: string;
    password: string;
  }) {
    return this.http.post<{
      access_token: string;
      refresh_token: string;
    }>(environment.apiUrl + 'auth/signup', param).pipe(
      tap(console.log),
      timeout(environment.apiTimeout),
      catchError(() => of<false>(false))
    );
  }

  signin(param: {
    email: string;
    password: string;
  }) {
    return this.http.post<{
      access_token: string;
      refresh_token: string;
    }>(environment.apiUrl + 'auth/signin', param).pipe(
      tap(console.log),
      timeout(environment.apiTimeout),
      catchError(() => of<false>(false))
    );
  }

  getTaxs(param: ITaxParam): Observable<IResponse | false> {
    let headers = new HttpHeaders();
    headers = headers.set('usedforauthstatus', 'true');

    let params = new HttpParams();
    for (const [key, value] of Object.entries(param)) {
      params = params.append(key, value);
    }
    return this.http.get<IResponse>(environment.apiUrl + 'erp/inv/Tax', { headers: headers, params: params }).pipe(
      tap(console.log),
      timeout(environment.apiTimeout),
      catchError(() => of<false>(false))
    );
  }


}
