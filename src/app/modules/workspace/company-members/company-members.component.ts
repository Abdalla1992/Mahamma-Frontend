import { MemberModel } from 'src/app/@AppService/models/search.member.model';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';
import { UserService } from 'src/app/@AppService/services/user.service';
import { User } from 'src/app/@AppService/models/user.model';
import { InviteMemberCompanyComponent } from '../invite-member-company/invite-member-company.component';

@Component({
  selector: 'app-company-members',
  templateUrl: './company-members.component.html',
  styleUrls: ['./company-members.component.scss'],
})
export class CompanyMembersComponent extends BaseListComponent<User, User> implements OnChanges {

  filterGroup: FormGroup;
  @Input() searchKeyword: string;

  constructor(
    public userService: UserService,
    private fb: FormBuilder,
    private routers: Router
  ) {
    super(userService);
    this.setUserPrivilage(Pages.WorkspaceProfile, SystemActions.ViewWorkspace);
    //this.addEditComponent = AddEditWorkspaceComponent;
    this.searchModel = {
      filter: {},
      paginator: { page: 0, pageSize: 1000000, total: 1000000, pageSizes: [] },
      sorting: { column: 'fullName', direction: 'asc' },
      entityId: 0,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnInit();
  }

  filterForm() {
    this.filterGroup = this.fb.group({
      fullName: [''],
    });
    this.subscriptions.push(
      this.filterGroup.controls.fullName.valueChanges.subscribe(() =>
        this.filter()
      )
    );
  }
  filter() {
    const filter = {};
    const name = this.searchKeyword;
    if (name) {
      filter['fullName'] = name;
    }
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 1000000, total: 1000000, pageSizes: [] },
      sorting: { column: 'fullName', direction: 'asc' },
      entityId: 0,
    };
    this.userService.fetch(this.searchModel);
  }
  createInvitation() {
    const modalRef = this.modalService.open(InviteMemberCompanyComponent, {
      // size: 'xl',
      modalDialogClass: 'crud-process',
    });
    modalRef.result.then(
      () => this.filter(),
      () => { }
    );
  }
  openMemberProfile(userId: number) {
    //this.userService.userProfileId = userId;
    debugger;
    this.navigateToUrl('profile/' + userId);
    //this.navigateToUrlWithId('profile/', userId);
  }
}
