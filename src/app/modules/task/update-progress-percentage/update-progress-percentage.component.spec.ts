import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProgressPercentageComponent } from './update-progress-percentage.component';

describe('UpdateProgressPercentageComponent', () => {
  let component: UpdateProgressPercentageComponent;
  let fixture: ComponentFixture<UpdateProgressPercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProgressPercentageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProgressPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
