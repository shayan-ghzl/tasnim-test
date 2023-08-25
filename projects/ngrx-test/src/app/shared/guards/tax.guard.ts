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

  if (storageService.token) {
    return true;
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
            return true;
          }
          router.navigateByUrl('/login');
          return false;
        })
      );
    } else {
      router.navigateByUrl('/login');
      return false;
    }
  }

};
