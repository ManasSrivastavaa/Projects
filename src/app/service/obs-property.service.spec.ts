import { TestBed } from '@angular/core/testing';

import { ObsPropertyService } from './obs-property.service';

describe('ObsPropertyService', () => {
  let service: ObsPropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObsPropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
