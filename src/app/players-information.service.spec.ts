import { TestBed, inject } from '@angular/core/testing';

import { PlayersInformationService } from './players-information.service';

describe('PlayersInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayersInformationService]
    });
  });

  it('should be created', inject([PlayersInformationService], (service: PlayersInformationService) => {
    expect(service).toBeTruthy();
  }));
});
