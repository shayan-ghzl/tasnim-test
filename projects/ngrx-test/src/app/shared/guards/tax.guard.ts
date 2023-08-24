import { CanActivateFn } from '@angular/router';

export const taxGuard: CanActivateFn = (route, state) => {
  return true;
};
