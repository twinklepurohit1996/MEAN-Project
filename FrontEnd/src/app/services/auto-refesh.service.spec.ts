import { TestBed } from '@angular/core/testing';

import { AutoRefeshService } from './auto-refesh.service';

describe('AutoRefeshService', () => {
  let service: AutoRefeshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoRefeshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
