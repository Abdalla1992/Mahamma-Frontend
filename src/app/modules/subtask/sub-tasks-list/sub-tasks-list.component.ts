import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskPriority } from 'src/app/@AppService/Enums/task.priority';
import { TaskStatus } from 'src/app/@AppService/Enums/task.status';
import { TaskRequest } from 'src/app/@AppService/models/task/task.request.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { SubmitTaskComponent } from '../../task/submit-task/submit-task.component';
import { AddSubTaskComponent } from '../add-sub-task/add-sub-task.component';
import { InviteMembersDialogComponent } from '../invite-members-dialog/invite-members-dialog.component';
import { UpdateProgressPercentageComponent } from '../update-progress-percentage/update-progress-percentage.component';

@Component({
  selector: 'app-sub-tasks-list',
  templateUrl: './sub-tasks-list.component.html',
  styleUrls: ['./sub-tasks-list.component.scss']
})
export class SubTasksListComponent extends BaseListComponent<TaskRequest, TaskResponse>{

  @Input() parentTaskId: number;
  @Input() projectId: number;
  @Input() isReadOnly: boolean = false;
  inActiveTask: TaskResponse[];
  pendingTask: TaskResponse[];
  doneTask: TaskResponse[];


  //@Input() taskList: TaskResponse[];

  filterGroup: FormGroup;

  public get TaskStatus(): typeof TaskStatus {
    return TaskStatus;
  }

  public get TaskPriority(): typeof TaskPriority {
    return TaskPriority;
  }

  constructor(public taskService: TaskService,
    private fb: FormBuilder,) {
    super(taskService);
    this.addEditComponent = AddSubTaskComponent;
  }

  ngOnInit(): void {
    const filter = {};
    filter['projectId'] = this.projectId;
    filter['parentTaskId'] = this.parentTaskId;
    this.searchModel = {
      filter: filter,
      paginator: {
        page: 0,
        pageSize: 10000000,
        total: 10000000,
        pageSizes: [],
      },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    super.ngOnInit();
  }

  filterForm() {
    this.filterGroup = this.fb.group({
      name: [''],
    });
    this.subscriptions.push(
      this.filterGroup.controls.name.valueChanges.subscribe(() => this.filter())
    );
  }
  filter() {
    const filter = {};
    filter['projectId'] = this.projectId;
    filter['parentTaskId'] = this.parentTaskId;
    const name = this.filterGroup.controls['name'].value;
    if (name) {
      filter['name'] = name;
    }
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 1000000, total: 100000000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.taskService.fetch(this.searchModel);
  }

  createNewSubTask() {
    this.OpenPopUp(AddSubTaskComponent, { modalDialogClass: 'crud-process' }, [['parentTaskId', this.parentTaskId], ['projectId', this.projectId]])
  }
  
  navigateToSubTaskProfile(id: number) {
    this.navigateToUrl('/sub-task/' + id);
  }

  cardView: boolean = false;
  listView: boolean = true;
  calender: boolean = false;

  showListView(event) {
    this.listView = true;
    this.cardView = false;
    this.calender = false

  }

  showCalender(event){
    this.cardView = false
    this.listView = false
    this.calender = true
  }
  
  showCardView(event) {
    this.cardView = true;
    this.listView = false;
    this.calender = false

    this.taskService.items$.subscribe(task => {
      this.inActiveTask = task.filter(t => t.taskStatusId == this.TaskStatus.InProgress || t.taskStatusId == this.TaskStatus.InProgressWithDelay);
      this.pendingTask = task.filter(t => t.taskStatusId == this.TaskStatus.New);
      this.doneTask = task.filter(t => t.taskStatusId == this.TaskStatus.CompletedEarly
        || t.taskStatusId == this.TaskStatus.CompletedLate
        || t.taskStatusId == this.TaskStatus.CompletedOnTime);
    })
  }

  updateTask(id: number) {
    this.OpenPopUp(
      AddSubTaskComponent,
      { modalDialogClass: 'crud-process' },
      [
        ['id', id],
        ['projectId', this.projectId],
        ['reloadCurrentPage', true],
      ],
      [[
        'entityUpdatedOutput',
        (event) => {
          this.ngOnInit();
        },
      ]]
    );
  }



  updateProgressPercentagePopup(task: TaskResponse) {
    this.OpenPopUp(
      UpdateProgressPercentageComponent,
      { modalDialogClass: 'crud-process' },
      [
        ['taskId', task.id],
        ['progressPercentage', task.progressPercentage]
      ],
      [
        ['progressPercentageUpdatedOutput',
        (event) => {
          this.ngOnInit();
        },]
      ]
    );
  }

  openTaskSubmit(task:TaskResponse) {
    this.OpenPopUp(
      SubmitTaskComponent,
      { modalDialogClass: 'crud-process' },
      [
        ['taskId', task.id],
        ['reloadCurrentPage', true],
      ],
      [
        ['entityUpdatedOutput',
        (event) => {
          this.ngOnInit();
        },]
      ]
    );
  }

  openInviteMember(task:TaskResponse) {
    this.OpenPopUp(
      InviteMembersDialogComponent,
      { modalDialogClass: 'crud-process' },
      [
        ['id', task.id],
        ['members', task.members],
      ]
    );
  }
}
