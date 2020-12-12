import { TestBed } from '@angular/core/testing';

import { NumericFieldService } from './numeric-field.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NumericFieldService', () => {
  let service: NumericFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(NumericFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
