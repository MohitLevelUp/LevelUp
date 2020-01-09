import { TestBed } from '@angular/core/testing';

import { CoreValueService } from './core-value.service';

describe('CoreValueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoreValueService = TestBed.get(CoreValueService);
    expect(service).toBeTruthy();
  });
});
