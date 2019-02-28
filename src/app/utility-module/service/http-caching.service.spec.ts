import { TestBed } from '@angular/core/testing';

import { HttpCachingService } from './http-caching.service';

describe('HttpCachingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpCachingService = TestBed.get(HttpCachingService);
    expect(service).toBeTruthy();
  });
});
