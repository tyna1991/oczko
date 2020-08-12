import { TestBed, inject } from '@angular/core/testing';

import { CardsApiService } from './cards-api.service';

describe('CardsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardsApiService]
    });
  });

  it('should be created', inject([CardsApiService], (service: CardsApiService) => {
    expect(service).toBeTruthy();
  }));
});
