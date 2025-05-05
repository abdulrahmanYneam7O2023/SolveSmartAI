import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemManagementComponent } from './problem-management.component';

describe('ProblemManagementComponent', () => {
  let component: ProblemManagementComponent;
  let fixture: ComponentFixture<ProblemManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
