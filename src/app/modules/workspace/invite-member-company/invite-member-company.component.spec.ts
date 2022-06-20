import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteMemberCompanyComponent } from './invite-member-company.component';

describe('InviteMemberCompanyComponent', () => {
  let component: InviteMemberCompanyComponent;
  let fixture: ComponentFixture<InviteMemberCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteMemberCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteMemberCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
