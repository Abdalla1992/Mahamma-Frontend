import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTaskListComponent } from './card-task-list.component';

describe('CardTaskListComponent', () => {
  let component: CardTaskListComponent;
  let fixture: ComponentFixture<CardTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
