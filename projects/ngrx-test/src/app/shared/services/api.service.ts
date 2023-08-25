import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/ngrx-test/src/environments/environment';
import { Observable, catchError, of, tap, timeout } from 'rxjs';
import { IResponse, ITaxParam } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  signup(param: any) {
    return this.http.post<any>(environment.apiUrl + 'inv/signup', param).pipe(
      tap(console.log),
      timeout(environment.apiTimeout),
      catchError(() => of<false>(false))
    );
  }

  signin(param: any) {
    return this.http.post<any>(environment.apiUrl + 'inv/signin', param).pipe(
      tap(console.log),
      timeout(environment.apiTimeout),
      catchError(() => of<false>(false))
    );
  }

  getTaxs(param: ITaxParam): Observable<IResponse | false> {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(param)) {
      params = params.append(key, value);
    }
    return this.http.get<IResponse>(environment.apiUrl + 'inv/Tax', { params: params }).pipe(
      tap(console.log),
      timeout(environment.apiTimeout),
      catchError(() => of<false>(false))
    );
  }


}
