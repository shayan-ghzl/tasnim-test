import { TestBed } from '@angular/core/testing';

import { AttachTokenInterceptor } from './attach-token.interceptor';

describe('AttachTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AttachTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AttachTokenInterceptor = TestBed.inject(AttachTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
