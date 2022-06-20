import {
  MemberModel,
  SearchUserForProject,
  SearchUserForWorkspace,
} from './../../../@AppService/models/search.member.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/@AppService/models/project.model';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { CompanyService } from 'src/app/@AppService/services/company.service';
import { Router } from '@angular/router';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { TaskRequest } from 'src/app/@AppService/models/task/task.request.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';

@Component({
  selector: 'app-invite-members-dialog',
  templateUrl: './invite-members-dialog.component.html',
  styleUrls: ['./invite-members-dialog.component.scss'],
})
//extends BaseAddEditComponent<Project, Project>
export class InviteMembersDialogComponent extends BaseComponent implements OnInit {
  taskResponse: TaskResponse;
  @Input() id: number;
  @Input() members: MemberModel[];
  formGroup: FormGroup;
  userList: MemberModel[];
  userIdList: number[];
  selectedUserList: MemberModel[] = [];
  member: string;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private companyService: CompanyService,
    public modal: NgbActiveModal,

  ) { super(); }

  ngOnInit(): void {
    this.selectedUserList = this.members;
    this.loadForm();
  }

  loadForm(): void {
    this.formGroup = this.fb.group({
      member: [this.member],
    });
    this.userIdList = [];
    if (this.selectedUserList && this.selectedUserList.length > 0) {
      this.selectedUserList.forEach((member) => {
        this.userIdList.push(member.userId);
      });
    }
  }

  AutoCompleteChange(event: any) {
    this.userList = [];
    let searchUserForTask = {
      name: event.target.value,
      taskId: this.id,
    };
    this.companyService
      .searchUserForTask(searchUserForTask)
      .subscribe((member) => {
        if (member.isValidResponse) {
          this.userList = member.result.responseData;
          this.userList = this.userList.filter(
            (u) => !this.userIdList.includes(u.userId)
          );
        }
      });
  }

  Selectautocomplete(option: MemberModel) {
    this.userIdList.push(option.userId);
    this.selectedUserList.push(option);
    this.formGroup.get('member')?.setValue('');
    this.userList = [];
  }

  removeMember(element, userId: number) {
    this.userIdList = this.userIdList.filter((u) => u !== userId);
    element.srcElement.parentElement.remove();
  }

  saveMembers() {
    if (this.userIdList)
      this.taskService
        .assignMember(this.id, this.userIdList)
        .subscribe((response) => {
          if (response.isValidResponse) {
            if (response.result.responseData) {
              this.showSuccessMessage(response.result.commandMessage);
            } else {
              this.showErrorMessage(response.result.commandMessage);
            }
            this.modal.close();
            this.router.navigate(['/sub-task/']);
            this.taskService.taskId = this.id;
          } else {
            this.showErrorMessages(response.errors);
          }
        });
  }
}
