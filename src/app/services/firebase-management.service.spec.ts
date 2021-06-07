import { TestBed } from '@angular/core/testing';

import { FirebaseManagementService } from './firebase-management.service';

describe('FirebaseManagementService', () => {
  let service: FirebaseManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
