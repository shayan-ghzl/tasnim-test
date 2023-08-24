import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/ngrx-test/src/environments/environment';
import { tap, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  signup(parameters: Parameter) {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(parameters)) {
      params = params.append(key, value);
    }
    console.log('request sent getGoods', params);
    return this.http.post<any>(environment.apiUrl + 'Goods/GetGoods', {}, { params: params }).pipe(
      timeout(13000)
    );
  }

  signin(parameters: Parameter) {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(parameters)) {
      params = params.append(key, value);
    }
    return this.http.get<any>(environment.apiUrl + 'Goods/GetBrands', { params: params }).pipe(
      tap(console.log),
      timeout(environment.apiTimeout)
    );
  }

  // getGoodById(id: string) {
  //   return this.http.get<{ data: Good }>(environment.apiUrl + 'Goods/GetGoodById', { params: new HttpParams().append('id', id) }).pipe(
  //     tap(console.log),
  //     timeout(environment.apiTimeout)
  //   );
  // }

  getTaxs(parameters: ITaxParam) {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(parameters)) {
      params = params.append(key, value);
    }
    return this.http.get<IResponse>(environment.apiUrl + 'inv/Tax', { params: params }).pipe(
      timeout(environment.apiTimeout),
      catchError(() => of<false>(false))
    );
  }


}
