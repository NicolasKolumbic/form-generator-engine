import { TestBed } from '@angular/core/testing';

import { FactoryResolverService } from './factory-resolver.service';

describe('FactoryResolverService', () => {
  let service: FactoryResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactoryResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
