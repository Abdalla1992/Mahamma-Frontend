import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { confirmationType } from 'src/app/@AppService/Enums/confirmation-type';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';
import { SearchModel } from 'src/app/@AppService/models/common/search.model';
import { MemberModel, SearchUserForWorkspace } from 'src/app/@AppService/models/search.member.model';
import { Workspace } from 'src/app/@AppService/models/workspace.model';
import { CompanyService } from 'src/app/@AppService/services/company.service';
import { UserService } from 'src/app/@AppService/services/user.service';
import { WorkspaceService } from 'src/app/@AppService/services/workspace.service';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { ConfirmationComponent } from 'src/app/@core/Component/confirmation/confirmation/confirmation.component';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
import { AddProjectComponent } from 'src/app/modules/project/add-project/add-project.component';
import { AddEditWorkspaceComponent } from 'src/app/modules/workspace/add-edit-workspace/add-edit-workspace.component';

@Component({
  selector: 'app-my-work',
  templateUrl: './my-work.component.html',
  styleUrls: ['./my-work.component.scss']
})
export class MyWorkComponent extends BaseComponent implements OnInit {
  @Input() workspaceId: number;
  workspace: Workspace;
  workspaceList: Workspace[];
  private modalService: NgbModal;
  searchUserForWorkspace: SearchUserForWorkspace;
  userList: MemberModel[];
  assignMemberGroup: FormGroup;
  searchModel: SearchModel;
  editWSMembers: boolean = false;
  constructor(private fb: FormBuilder, private workspaceService: WorkspaceService,
    private companyService: CompanyService, public userService: UserService) {
    super();
    this.setUserPrivilage(Pages.WorkspaceProfile,SystemActions.ViewWorkspace);
    const injector = AppInjector.getInjector();
    this.modalService = injector.get(NgbModal);
  }

  ngOnInit(): void {
    this.loadAssignMemberGroup();
    this.getWorkspaceList();
    this.workspaceService.getWorkspace(this.workspaceId).subscribe((response) => {
      if (response.isValidResponse) {
        if (response.result.responseData) {
          this.workspace = response.result.responseData;
        } else {
          this.showErrorMessage(response.result.commandMessage);
        }
      }
      else {
        this.showErrorMessages(response.errors);
      }
    });
  }
  getWorkspaceList() {
    this.searchModel = {
      filter: {},
      paginator: { page: 0, pageSize: 1000000, total: 1000000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.workspaceService.getWorkspaceList(this.searchModel).subscribe((response) => {
      if (response)
        this.workspaceList = response.items;
    })
  }
  loadAssignMemberGroup(): void {
    this.assignMemberGroup = this.fb.group({
      member: ['']
    });
  }

  openAddWorkspace() {
    let id = undefined;
    const modalRef = this.modalService.open(AddEditWorkspaceComponent, {
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() => { });
  }
  openAddPoroject() {
    let id = undefined;
    const modalRef = this.modalService.open(AddProjectComponent, {
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.entityId = this.workspaceId;
    modalRef.result.then(() => { });
  }
  redirectToWorkspaceProfile() {
    this.navigateToUrl('/workspace/workspace-profile');
    this.workspaceService.workspaceId = this.workspaceId;
  }

  AutoCompleteChange(event: any) {
    this.userList = [];
    this.searchUserForWorkspace = {
      name: event.target.value,
      workspaceId: this.workspaceId,
    };
    this.companyService
      .searchUserForWorkspace(this.searchUserForWorkspace)
      .subscribe((member) => {
        if (member.isValidResponse) {
          this.userList = member.result.responseData;
          this.userList = this.userList.filter(
            (u) => !this.workspace.userIdList.includes(u.userId)
          );
        }
      });
  }
  Selectautocomplete(option: MemberModel) {
    this.workspace.userIdList.push(option.userId);
    this.assignMemberGroup.get('member')?.setValue('');
    this.workspaceService.updateWorkspace(this.workspace).subscribe((response) => {
      if (response.isValidResponse) {
        if (response.result.responseData) {
          this.showSuccessMessage(response.result.commandMessage);
          this.ngOnInit();
        }
        else {
          this.showErrorMessage(response.result.commandMessage);
        }
      } else {
        this.showErrorMessages(response.errors);
      }
    })
    // this.selectedUserList.push(option);
    this.userList = [];
  }
  navigateToWorkspaceProfile(id: number) {
    // this.navigateToUrlWithId('/workspace/workspace-profile', id);
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['workspace/workspace-profile']));
    this.workspaceService.workspaceId = id;
  }
  editWorkspaceMember() {
    this.editWSMembers = !this.editWSMembers;
  }

  removeWSMember(userId: number) {
    const modalRef = this.modalService.open(ConfirmationComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.componentType = confirmationType.Delete;
    modalRef.result.then(
      (response) => {
        this.confirmRemoveWSMember(userId);
      },
      () => { }
    );
  }

  confirmRemoveWSMember(userId: number) {
    this.workspaceService.removeWSMember(userId, this.workspaceId).subscribe(response => {
      if (response.isValidResponse) {
        if (response.result.responseData) {
          this.ngOnInit();
          this.editWSMembers = false;
          this.showSuccessMessage(response.result.commandMessage);
        } else {
          this.showErrorMessage(response.result.commandMessage);
        }
      } else {
        this.showErrorMessages(response.errors);
      }
    })
  }

  openMemberProfile(userId: number) {
    // this.userService.userProfileId = userId;
    // this.navigateToUrl('profile/');
    this.navigateToUrl('profile/' + userId);
  }
}
