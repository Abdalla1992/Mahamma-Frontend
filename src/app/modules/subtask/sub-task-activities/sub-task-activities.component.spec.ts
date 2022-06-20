import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTaskActivitiesComponent } from './sub-task-activities.component';

describe('SubTaskActivitiesComponent', () => {
  let component: SubTaskActivitiesComponent;
  let fixture: ComponentFixture<SubTaskActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubTaskActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTaskActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
