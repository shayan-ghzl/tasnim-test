import { CanActivateFn } from '@angular/router';

export const registerGuard: CanActivateFn = (route, state) => {
  return true;
};
