import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSubTaskListComponent } from './card-sub-task-list.component';

describe('CardSubTaskListComponent', () => {
  let component: CardSubTaskListComponent;
  let fixture: ComponentFixture<CardSubTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSubTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSubTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
