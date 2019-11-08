import { TestBed } from '@angular/core/testing';

import { JsondataService } from './jsondata.service';

describe('JsondataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsondataService = TestBed.get(JsondataService);
    expect(service).toBeTruthy();
  });
});
