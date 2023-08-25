import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { TaxActions } from './actions';


@Injectable()
export class ApplicationEffects {

  startUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(TaxActions.startEffect),
      switchMap(() => this.apiService.getTaxs({
        filter: '',
        order: '',
        page: 1,
        take: 100
      }).pipe(
        map(response => {
          if (response) {
            return TaxActions.set({ taxs: response.results });
          }
          return TaxActions.set({ taxs: [] });
        }),
      ))
    );
  });

  constructor(
    private apiService: ApiService,
    private action$: Actions,
  ) { }

}
