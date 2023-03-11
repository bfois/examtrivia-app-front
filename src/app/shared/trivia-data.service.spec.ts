import { TestBed } from '@angular/core/testing';

import { TriviaDataService } from './trivia-data.service';

describe('TriviaDataService', () => {
  let service: TriviaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriviaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
