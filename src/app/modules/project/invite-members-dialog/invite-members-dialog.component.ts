import {
  MemberModel,
  SearchUserForProject,
} from './../../../@AppService/models/search.member.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/@AppService/models/project.model';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { CompanyService } from 'src/app/@AppService/services/company.service';
import { Router } from '@angular/router';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';

@Component({
  selector: 'app-invite-members-dialog',
  templateUrl: './invite-members-dialog.component.html',
  styleUrls: ['./invite-members-dialog.component.scss'],
})
//extends BaseAddEditComponent<Project, Project>
export class InviteMembersDialogComponent extends BaseComponent implements OnInit {
  project: Project;
  @Input() id: number;
  @Input() members: MemberModel[];
  formGroup: FormGroup;
  userList: MemberModel[];
  protected router: Router;
  selectedUserList: MemberModel[] = [];
  searchUserForProject: SearchUserForProject;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private companyService: CompanyService,
    public modal: NgbActiveModal
  ) {
    super();
    const injector = AppInjector.getInjector();
    this.router = injector.get(Router);
  }

  ngOnInit(): void {
    //super.ngOnInit();
    this.selectedUserList = this.members;
    this.project = this.emptyEntity();
    this.loadForm();
  }

  loadForm(): void {
    this.formGroup = this.fb.group({
      member: [this.project.member],
    });
    this.project.userIdList = [];
    if (this.selectedUserList && this.selectedUserList.length > 0) {
      this.selectedUserList.forEach((member) => {
        this.project.userIdList.push(member.userId);
      });
    }
  }

  prepareEntity(): void {
    const formData = this.formGroup.value;
  }

  emptyEntity(): Project {
    return {
      id: undefined,
      name: '',
      description: '',
      dueDate: new Date(),
      activationStatus: '',
      userIdList: [],
      workSpaceId: 0,
      creatorUserId: 0,
      member: '',
      projectAttachments: [],
      filesCount: 0,
      members: [],
      progressPercentage: 0
    };
  }

  AutoCompleteChange(event: any) {
    this.userList = [];
    this.searchUserForProject = {
      name: event.target.value,
      projectId: this.id,
    };
    this.companyService
      .searchUserForProject(this.searchUserForProject)
      .subscribe((member) => {
        if (member.isValidResponse) {
          this.userList = member.result.responseData;
          this.userList = this.userList.filter(
            (u) => !this.project.userIdList.includes(u.userId)
          );
        }
      });
  }
  Selectautocomplete(option: MemberModel) {
    this.project.userIdList.push(option.userId);
    this.selectedUserList.push(option);
    this.formGroup.get('member')?.setValue('');
    this.userList = [];
  }
  removeMember(element, userId: number) {
    this.project.userIdList = this.project.userIdList.filter(
      (u) => u !== userId
    );
    element.srcElement.parentElement.remove();
  }
  saveMembers() {
    this.projectService
      .assignMember(this.id, this.project.userIdList)
      .subscribe((response) => {
        if (response.isValidResponse) {
          if (response.result.responseData) {
            this.showSuccessMessage(response.result.commandMessage);
          } else {
            this.showErrorMessage(response.result.commandMessage);
          }
          this.modal.close();
          this.router.navigate(['/project/project-profile']);
          this.projectService.projectId = this.id;
        } else {
          this.showErrorMessages(response.errors);
        }
      });
  }
}
