import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageManagementComponent } from './language-management.component';

describe('LanguageManagementComponent', () => {
  let component: LanguageManagementComponent;
  let fixture: ComponentFixture<LanguageManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
