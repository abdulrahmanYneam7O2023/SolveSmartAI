import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProblemAIService } from '../../services/problem-ai.service'; // Corrected import

import { ProblemAiManagementComponent } from './problem-ai-management.component';

describe('ProblemAiManagementComponent', () => {
  let component: ProblemAiManagementComponent;
  let fixture: ComponentFixture<ProblemAiManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemAiManagementComponent],
      providers: [ProblemAIService] // Added ProblemAIService to providers
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemAiManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
