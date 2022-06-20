import { CompanyService } from './../../../@AppService/services/company.service';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/@AppService/models/project.model';
import {
  MemberModel,
  SearchUserForProject,
} from 'src/app/@AppService/models/search.member.model';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { User } from 'src/app/@core/auth/app-user';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent
  extends BaseAddEditComponent<Project, Project>
  implements OnInit {
  @Input() workspaceId: number;
  @Input() isCreatedFromMeeting: boolean;
  date = new Date();

  formGroup: FormGroup;
  userList: MemberModel[];
  selectedUserList: MemberModel[] = [];
  searchUserForProject: SearchUserForProject;

  constructor(
    private fb: FormBuilder,
    projectService: ProjectService,
    private companyService: CompanyService,
    public modal: NgbActiveModal
  ) {
    super(projectService, modal);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  loadForm(): void {
    //   debugger;
    this.formGroup = this.fb.group({
      name: [
        this.responseEntity.name,
        Validators.compose([Validators.required]),
      ],
      member: [this.responseEntity.member],
      description: [
        this.responseEntity.description,
        Validators.compose([Validators.required]),
      ],
      dueDate: [
        formatDate(this.responseEntity.dueDate, 'yyyy-MM-dd', 'en'),
        [Validators.compose([Validators.required])],
      ],
    });
  }

  prepareEntity(): void {
    const formData = this.formGroup.value;
    this.entity.id = this.id;
    this.entity.name = formData.name;
    this.entity.description = formData.description;
    this.entity.dueDate = formData.dueDate;
    this.entity.workSpaceId = this.workspaceId && this.workspaceId > 0 ? this.workspaceId : this.entityId;
    this.entity.isCreatedFromMeeting = this.isCreatedFromMeeting;
  }

  clearEntity(): void {
    if (this.entity == undefined || this.entity == null) return;

    this.entity.name = '';
    this.entity.description = '';
    this.entity.dueDate = new Date();
    this.entity.workSpaceId = 0;
    this.entity.userIdList = [];
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
      members: [],
      projectAttachments: [],
      filesCount: 0,
      progressPercentage: 0
    };
  }
  emptyResponseEntity(): Project {
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
      members: [],
      projectAttachments: [],
      filesCount: 0,
      progressPercentage: 0
    };
  }
  AutoCompleteChange(event: any) {
    this.userList = [];
    this.searchUserForProject = {
      name: event.target.value,
      projectId: 0,
    };
    this.companyService
      .searchUserForProject(this.searchUserForProject)
      .subscribe((member) => {
        if (member.isValidResponse) {
          this.userList = member.result.responseData;
          this.userList = this.userList.filter(
            (u) => !this.entity.userIdList.includes(u.userId)
          );
        }
      });
  }
  Selectautocomplete(option: MemberModel) {
    this.entity.userIdList.push(option.userId);
    this.selectedUserList.push(option);
    this.formGroup.get('member')?.setValue('');
    this.userList = [];
  }
  removeMember(element, userId: number) {
    this.entity.userIdList = this.entity.userIdList.filter((u) => u !== userId);
    element.srcElement.parentElement.remove();
  }
}
