import { TestBed, inject } from '@angular/core/testing';

import { RpsService } from './rps.service';

describe('RpsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RpsService]
    });
  });

  it('should ...', inject([RpsService], (service: RpsService) => {
    expect(service).toBeTruthy();
  }));
});
