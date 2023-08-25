import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/features';
import { map } from 'rxjs';
import { LoadingActions, TaxActions } from '../../store/actions';

export const loginGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const apiService = inject(ApiService);
  const router = inject(Router);
  const store = inject(Store<AppState>);

  if (storageService.token) {
    router.navigateByUrl('/taxs-list');
    return false;
  } else {
    if (storageService.getMainToken()) {
      storageService.token = storageService.getMainToken();
      return apiService.getTaxs({
        filter: '',
        order: '',
        page: 1,
        take: 100
      }).pipe(
        map(response => {
          if (response) {
            storageService.token = storageService.getMainToken();
            store.dispatch(TaxActions.set({ taxs: response.results }));
            store.dispatch(LoadingActions.set({ enable: false }));
            router.navigateByUrl('/taxs-list');
            return false;
          }
          return true;
        })
      );
    } else {
      return true;
    }
  }

};
