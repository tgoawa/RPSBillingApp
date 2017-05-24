import { TestBed, inject } from '@angular/core/testing';

import { MaintenanceFeeService } from './maintenance-fee.service';

describe('MaintenanceFeeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaintenanceFeeService]
    });
  });

  it('should ...', inject([MaintenanceFeeService], (service: MaintenanceFeeService) => {
    expect(service).toBeTruthy();
  }));
});
