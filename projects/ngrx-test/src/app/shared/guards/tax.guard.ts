import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { LoadingActions, TaxActions } from '../../store/actions';
import { AppState } from '../../store/features';
import { ApiService } from '../services/api.service';
import { AuthStatus, StorageService } from '../services/storage.service';

export const taxGuard: CanActivateFn = (route, state) => {
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
            return true;
          }
          storageService.removeMainToken();
          storageService.token = null;
          storageService.authenticationStatus = AuthStatus.reject;
          router.navigateByUrl('/login');
          return false;
        })
      );

    } else {
      store.dispatch(LoadingActions.set({ enable: false }));
      storageService.authenticationStatus = AuthStatus.reject;
      router.navigateByUrl('/login');
      return false;
    }

  } else if (storageService.authenticationStatus === AuthStatus.passes) {
    return true;
  } else {
    // authenticationStatus is set to reject
    router.navigateByUrl('/login');
    return false;
  }

};
