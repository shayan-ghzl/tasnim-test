import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { taxGuard } from './tax.guard';

describe('taxGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => taxGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
