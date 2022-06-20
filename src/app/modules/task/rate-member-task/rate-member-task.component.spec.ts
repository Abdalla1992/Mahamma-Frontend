import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateMemberTaskComponent } from './rate-member-task.component';

describe('RateMemberTaskComponent', () => {
  let component: RateMemberTaskComponent;
  let fixture: ComponentFixture<RateMemberTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateMemberTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateMemberTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
