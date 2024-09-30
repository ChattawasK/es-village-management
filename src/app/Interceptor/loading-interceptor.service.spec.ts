/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoadingInterceptorService } from './loading-interceptor.service';

describe('Service: LoadingInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingInterceptorService]
    });
  });

  it('should ...', inject([LoadingInterceptorService], (service: LoadingInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
