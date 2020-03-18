import { TestBed } from '@angular/core/testing';

import { DateValueAccessorService } from './date-value-accessor.service';

describe('DateValueAccessorService', () => {
  let service: DateValueAccessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateValueAccessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
