import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { LoadingActions, TaxActions } from '../../store/actions';
import { AppState } from '../../store/features';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';

export const taxGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const apiService = inject(ApiService);
  const router = inject(Router);
  const store = inject(Store<AppState>);

  if (storageService.token !== null) {
    if (storageService.token) {
      return true;
    } else {
      router.navigateByUrl('/login');
      return false;
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
            return true;
          }
          storageService.removeMainToken();
          storageService.token = '';
          router.navigateByUrl('/login');
          return false;
        })
      );
    } else {
      store.dispatch(LoadingActions.set({ enable: false }));
      router.navigateByUrl('/login');
      return false;
    }
  }

};
