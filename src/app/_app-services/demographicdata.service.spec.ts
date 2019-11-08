import { TestBed } from '@angular/core/testing';

import { DemographicdataService } from './demographicdata.service';

describe('DemographicdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemographicdataService = TestBed.get(DemographicdataService);
    expect(service).toBeTruthy();
  });
});