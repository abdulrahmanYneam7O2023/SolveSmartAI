import { TestBed } from '@angular/core/testing';

import { ProblemAIService } from './problem-ai.service';

describe('ProblemAIService', () => {
  let service: ProblemAIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemAIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
