import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/features';
import { map } from 'rxjs';
import { LoadingActions, TaxActions } from '../../store/actions';

export const registerGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const apiService = inject(ApiService);
  const router = inject(Router);
  const store = inject(Store<AppState>);

  if (storageService.token !== null) {
    if (storageService.token) {
      router.navigateByUrl('/taxs-list');
      return false;
    } else {
      return true;
    }
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
          store.dispatch(LoadingActions.set({ enable: false }));
          if (response) {
            store.dispatch(TaxActions.set({ taxs: response.results }));
            router.navigateByUrl('/taxs-list');
            return false;
          }
          storageService.removeMainToken();
          storageService.token = '';
          return true;
        })
      );
    } else {
      store.dispatch(LoadingActions.set({ enable: false }));
      return true;
    }
  }
};
