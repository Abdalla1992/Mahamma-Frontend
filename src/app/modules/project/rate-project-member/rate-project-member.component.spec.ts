import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateProjectMemberComponent } from './rate-project-member.component';

describe('RateProjectMemberComponent', () => {
  let component: RateProjectMemberComponent;
  let fixture: ComponentFixture<RateProjectMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateProjectMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateProjectMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
