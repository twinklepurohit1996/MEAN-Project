import { TestBed } from '@angular/core/testing';

import { AuthanicationService } from './authanication.service';

describe('AuthanicationService', () => {
  let service: AuthanicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthanicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
