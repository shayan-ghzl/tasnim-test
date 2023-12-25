import { HttpClient, HttpContextToken, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/ngrx-test/src/environments/environment';
import { Observable, catchError, of, tap, timeout } from 'rxjs';
import { IQuery, IResponse, ITaxParam } from '../models/models';

export const CACHE_OPTION = new HttpContextToken<{ cache: boolean, expiresIn?: number; }>(() => ({ cache: false }));

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // way three
  // private httpBackend: HttpClient;

  constructor(
    private http: HttpClient,
    // httpBackend: HttpBackend,
  ) {
    // way three
    // this.httpBackend = new HttpClient(httpBackend);
  }

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

  getTaxs(param?: Partial<ITaxParam>): Observable<IResponse | false> {
    // way one
    let headers = new HttpHeaders().set('usedforauthstatus', 'true');

    // way two
    // const context = new HttpContext();
    // context.set(CACHE_OPTION, {
    //   cache: true
    // });

    const url = environment.apiUrl + 'erp/inv/Tax';

    const params = new HttpParams().appendAll(this.removeUndefinedProperties(param));
    // way one
    return this.http.get<IResponse>(url, { headers: headers, params: params }).pipe(
      tap(console.log),
      timeout(environment.apiTimeout),
      catchError(() => of<false>(false))
    );

    // way two
    // return this.http.get<IResponse>(environment.apiUrl + 'erp/inv/Tax', { headers: headers, params: params, context: context }).pipe(
    //   tap(console.log),
    //   timeout(environment.apiTimeout),
    //   catchError(() => of<false>(false))
    // );

    // way three
    // return this.httpBackend.get<IResponse>(environment.apiUrl + 'erp/inv/Tax', { headers: headers, params: params }).pipe(
    //   tap(console.log),
    //   timeout(environment.apiTimeout),
    //   catchError(() => of<false>(false))
    // );
  }
   removeUndefinedProperties(obj?: Partial<IQuery>): IQuery {
    if (!obj) {
      return {};
    }
    const filteredObject: IQuery = Object.fromEntries(
      Object.entries(obj).filter(value => value !== undefined)
    ) as IQuery;
  
    return filteredObject;
  }
}