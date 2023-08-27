import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus, StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/features';
import { map } from 'rxjs';
import { LoadingActions, TaxActions } from '../../store/actions';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const apiService = inject(ApiService);
  const router = inject(Router);
  const store = inject(Store<AppState>);

  if (storageService.authenticationStatus === AuthStatus.pending) {
    const tokenFromLocalStorage = storageService.getMainToken();

    if (tokenFromLocalStorage) {
      storageService.token = tokenFromLocalStorage;

      return apiService.getTaxs({
        filter: '',
        order: '',
        distinct_fields: '',
        page: 1,
        take: 100
      }).pipe(
        map(response => {
          store.dispatch(LoadingActions.set({ enable: false }));
          if (response) {
            storageService.authenticationStatus = AuthStatus.passes;
            store.dispatch(TaxActions.set({ taxs: response.results }));
            router.navigateByUrl('/taxs-list');
            return false;
          }
          storageService.removeMainToken();
          storageService.token = null;
          storageService.authenticationStatus = AuthStatus.reject;
          return true;
        })
      );

    } else {
      store.dispatch(LoadingActions.set({ enable: false }));
      storageService.authenticationStatus = AuthStatus.reject;
      return true;
    }

  } else if (storageService.authenticationStatus === AuthStatus.passes) {
    router.navigateByUrl('/taxs-list');
    return false;
  } else {
    // authenticationStatus is set to reject
    return true;
  }

};
