import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskPriority } from 'src/app/@AppService/Enums/task.priority';
import { TaskStatus } from 'src/app/@AppService/Enums/task.status';
import { Project } from 'src/app/@AppService/models/project.model';
import { MemberModel, SearchUserForTask } from 'src/app/@AppService/models/search.member.model';
import { TaskRequest } from 'src/app/@AppService/models/task/task.request.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';
import { CompanyService } from 'src/app/@AppService/services/company.service';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent
  extends BaseAddEditComponent<TaskRequest, TaskResponse>
  implements OnInit {
    
  @Input() projectId: number;
  @Input() isCreatedFromMeeting: boolean;
  @Input() taskName: string = '';
  @Input() description: string = '';

  date = new Date();

  formGroup: FormGroup;
  selectedUserList: MemberModel[] = [];
  userList: MemberModel[];
  searchUserForTask: SearchUserForTask;

  taskDDL: TaskResponse[] = [];
  userProjects: Project[] = [];
  
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private companyService: CompanyService,
    public modal: NgbActiveModal,
    private projectService: ProjectService
  ) {
    super(taskService, modal);
  }

  ngOnInit(): void {
    super.ngOnInit();
    super.loadEntity();
    this.getTasksDDL();

    if(!this.projectId || this.projectId == 0){
      this.getUserProjects();
    }
  }
 

  getTasksDDL() {
    this.taskService.getTaskDDL(this.projectId).subscribe((response: TaskResponse[]) => {
      if (response.length > 0) {
        this.taskDDL = response;
      }
    })
  }
  loadForm(): void {
    this.formGroup = this.fb.group({
      projectId: [ this.projectId , Validators.required ],
      name: [
        this.responseEntity.name == '' ? this.taskName : this.responseEntity.name,
        Validators.compose([Validators.required]),
      ],
      member: [this.responseEntity.member],
      description: [ this.responseEntity.description == '' ? this.description : this.responseEntity.description],
      startDate: [
        formatDate(this.responseEntity.startDate, 'yyyy-MM-dd', 'en'),
        [Validators.compose([Validators.required])],
      ],
      dueDate: [
        formatDate(this.responseEntity.dueDate, 'yyyy-MM-dd', 'en'),
        [Validators.compose([Validators.required])],
      ],
      priority: [
        this.responseEntity.taskPriorityId
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
    this.entity.taskPriorityId = formData.priority;
    this.entity.taskPriorityId = this.entity.taskPriorityId > 0 ? this.entity.taskPriorityId : 1;
    this.entity.reviewRequest = formData.reviewRequest || false;
    this.entity.projectId = this.projectId ? this.projectId : formData.projectId;
    this.entity.taskStatusId = TaskStatus.New;
    this.entity.isCreatedFromMeeting = this.isCreatedFromMeeting;
    this.entity.dependencyTaskId = formData.dependencyTaskId && formData.dependencyTaskId > 0 ? formData.dependencyTaskId : null;
  }

  clearEntity(): void {
    if (this.entity == undefined || this.entity == null) return;

    this.entity.name = '';
    this.entity.description = '';
    this.entity.startDate = new Date();
    this.entity.dueDate = new Date();
    this.entity.taskPriorityId = 0;
    this.entity.projectId = 0;
  }

  emptyEntity(): TaskResponse {
    return {
      id: 0,
      name: '',
      description: '',
      startDate: new Date(),
      dueDate: new Date(),
      taskPriorityId: 0,
      reviewRequest: false,
      projectId: 0,
      taskStatusId: 0,
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

  emptyResponseEntity(): TaskResponse {
    return {
      id: 0,
      name: '',
      description: '',
      startDate: new Date(),
      dueDate: new Date(),
      taskPriorityId: 0,
      reviewRequest: false,
      projectId: 0,
      taskStatusId: 0,
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

  removeMember(element, userId: number) {
    this.entity.userIdList = this.entity.userIdList?.filter(
      (u) => u !== userId
    );
    element.srcElement.parentElement.remove();
  }

  //Range bar Method
  formatLabel(value: number) {
    return TaskPriority[value];
  }

  getUserProjects() {
    this.projectService.getProjectList().subscribe(
      res => this.userProjects = res.responseData,
      err => this.showErrorMessages(err)
    )
  }

  save(): void {
    this.entity.userIdList = this.selectedUserList.map(u => u.userId);
    super.save();
  }
}
