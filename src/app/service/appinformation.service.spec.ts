import { TestBed } from '@angular/core/testing';

import { AppinformationService } from './appinformation.service';

describe('AppinformationService', () => {
  let service: AppinformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppinformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
