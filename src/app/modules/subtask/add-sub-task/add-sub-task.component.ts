import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskPriority } from 'src/app/@AppService/Enums/task.priority';
import { TaskStatus } from 'src/app/@AppService/Enums/task.status';
import {
  MemberModel,
  SearchUserForProject,
  SearchUserForTask,
} from 'src/app/@AppService/models/search.member.model';
import { TaskRequest } from 'src/app/@AppService/models/task/task.request.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';
import { CompanyService } from 'src/app/@AppService/services/company.service';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';

@Component({
  selector: 'app-add-sub-task',
  templateUrl: './add-sub-task.component.html',
  styleUrls: ['./add-sub-task.component.scss'],
})
export class AddSubTaskComponent
  extends BaseAddEditComponent<TaskRequest, TaskResponse>
  implements OnInit {
  @Input() parentTaskId: number;
  @Input() projectId: number;
  formGroup: FormGroup;
  userList: MemberModel[];
  selectedUserList: MemberModel[] = [];
  subtaskDDL: TaskResponse[] = [];
  searchUserForTask: SearchUserForTask;
  date = new Date()

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private taskService: TaskService,
    public modal: NgbActiveModal
  ) {
    super(taskService, modal);
  }

  ngOnInit(): void {
    super.ngOnInit();
    super.loadEntity();
    this.getSubtasksDDL();
  }

  getSubtasksDDL() {
    this.taskService.getSubtaskDDL(this.parentTaskId).subscribe((response: TaskResponse[]) => {
      if (response.length > 0) {
        this.subtaskDDL = response;
      }
    })
  }

  loadForm(): void {
    this.formGroup = this.fb.group({
      name: [
        this.responseEntity.name,
        Validators.compose([Validators.required]),
      ],
      description: [this.responseEntity.description],
      member: [this.responseEntity.member],
      startDate: [
        formatDate(this.responseEntity.startDate, 'yyyy-MM-dd', 'en'),
        Validators.compose([Validators.required]),
      ],
      dueDate: [
        formatDate(this.responseEntity.dueDate, 'yyyy-MM-dd', 'en'),
        Validators.compose([Validators.required]),
      ],
      reviewRequest: [this.responseEntity.reviewRequest],
      dependencyTaskId: [this.responseEntity.dependencyTaskId]
    });
  }

  prepareEntity(): void {
    const formData = this.formGroup.value;
    this.entity.id = this.responseEntity?.id;
    this.entity.name = formData.name;
    this.entity.description = formData.description;
    this.entity.startDate = formData.startDate;
    this.entity.dueDate = formData.dueDate;
    this.entity.taskPriorityId = TaskPriority.Normal;
    this.entity.userIdList = this.entity.userIdList;
    this.entity.projectId = this.projectId;
    this.entity.parentTaskId = this.parentTaskId;
    this.entity.taskStatusId = TaskStatus.New;
    this.entity.isCreatedFromMeeting = this.isCreatedFromMeeting;
    this.entity.dependencyTaskId = formData.dependencyTaskId && formData.dependencyTaskId > 0 ? formData.dependencyTaskId : null;
  }

  clearEntity(): void {
    if (this.entity == undefined || this.entity == null) return;
  }

  emptyEntity(): TaskRequest {
    return {
      id: undefined,
      name: '',
      description: '',
      startDate: new Date(),
      dueDate: new Date(),
      taskPriorityId: 0,
      userIdList: [],
      projectId: this.projectId,
      parentTaskId: this.parentTaskId,
      taskStatusId: TaskStatus.New,
      dependencyTaskId: 0
    };
  }

  emptyResponseEntity(): TaskResponse {
    return {
      id: undefined,
      name: '',
      description: '',
      startDate: new Date(),
      dueDate: new Date(),
      taskPriorityId: 0,
      // userIdList: [],
      projectId: this.projectId,
      // ParentTaskId: this.parentTaskId,
      taskStatusId: TaskStatus.New,
      taskAttachments: [],
      member: '',
      filesCount: 0,
      workspaceId: 0,
      creatorUserId: 0,
      progressPercentage: 0,
      projectName: '',
      dependencyTaskId: 0
    };
  }

  AutoCompleteChange(event: any) {
    this.userList = [];
    this.searchUserForTask = {
      name: event.target.value,
      taskId: 0,
    };
    this.companyService
      .searchUserForTask(this.searchUserForTask)
      .subscribe((member) => {
        if (member.isValidResponse) {
          this.userList = member.result.responseData;
          this.userList = this.userList.filter(
            (u) => !this.entity.userIdList?.includes(u.userId)
          );
        }
      });
  }
  Selectautocomplete(option: MemberModel) {
    this.entity.userIdList?.push(option.userId);
    this.selectedUserList.push(option);
    this.formGroup.get('member')?.setValue('');
    this.userList = [];
  }
  removeMember(userId: number) {
    this.entity.userIdList = this.entity.userIdList?.filter(
      (u) => u !== userId
    );
  }
  //Range bar Method
  formatLabel(value: number) {
    return TaskPriority[value];
  }
}
