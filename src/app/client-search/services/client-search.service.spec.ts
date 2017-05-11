import { TestBed, inject } from '@angular/core/testing';

import { ClientSearchService } from './client-search.service';

describe('ClientSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientSearchService]
    });
  });

  it('should ...', inject([ClientSearchService], (service: ClientSearchService) => {
    expect(service).toBeTruthy();
  }));
});
