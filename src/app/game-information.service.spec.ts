import { TestBed, inject } from '@angular/core/testing';

import { GameInformationService } from './game-information.service';

describe('GameInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameInformationService]
    });
  });

  it('should be created', inject([GameInformationService], (service: GameInformationService) => {
    expect(service).toBeTruthy();
  }));
});
