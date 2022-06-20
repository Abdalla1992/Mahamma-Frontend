import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TaskPriority } from 'src/app/@AppService/Enums/task.priority';
import { TaskStatus } from 'src/app/@AppService/Enums/task.status';
import { TaskRequest } from 'src/app/@AppService/models/task/task.request.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { AddTaskComponent } from '../../task/add-task/add-task.component';
import { InviteMembersDialogComponent } from '../invite-members-dialog/invite-members-dialog.component';
import { SubmitTaskComponent } from '../submit-task/submit-task.component';
import { UpdateProgressPercentageComponent } from '../update-progress-percentage/update-progress-percentage.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent
  extends BaseListComponent<TaskRequest, TaskResponse>
  implements OnInit , OnChanges {
  @Input() isReadOnly: boolean = false;
  @Input() searchKeyword: string = '';
  @Input() projectId: number;
  @Input() workspaceId: number;
  @Input() show?: boolean;

  filterGroup: FormGroup;

  inActiveTask: TaskResponse[];
  pendingTask: TaskResponse[];
  doneTask: TaskResponse[];

  cardView: boolean = false;
  listView: boolean = true;
  calender: boolean = false;

  public get TaskStatus(): typeof TaskStatus {
    return TaskStatus;
  }

  public get TaskPriority(): typeof TaskPriority {
    return TaskPriority;
  }

  constructor(public taskService: TaskService, private fb: FormBuilder) {
    super(taskService);
    this.addEditComponent = AddTaskComponent;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.filter();
  }
  filterForm() {
    this.filterGroup = this.fb.group({
      name: [this.searchKeyword],
    });
    this.subscriptions.push(
      this.filterGroup.controls.name.valueChanges.subscribe(() => this.filter())
    );
  }

  filter() {
    const filter = {};
    filter['projectId'] = this.projectId;
    const name = this.filterGroup.controls['name'].value;
    if (name) {
      filter['name'] = name;
    }
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 10000000, total: 100000000, pageSizes: [1,2,3] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.taskService.fetch(this.searchModel);
  }

  createNewTask() {
    this.OpenPopUp(AddTaskComponent, { modalDialogClass: 'crud-process' }, [
      ['projectId', this.projectId],
    ]);
  }
  navigateToTaskProfile(id: number) {
    this.navigateToUrl('/task/');
    this.taskService.taskId = id;
  }
  showCardView(event) {
    this.calender = false
    this.cardView = true;
    this.listView = false;
    this.taskService.items$.subscribe(task => {
      this.inActiveTask = task.filter(t => t.taskStatusId == this.TaskStatus.InProgress || t.taskStatusId == this.TaskStatus.InProgressWithDelay);
      this.pendingTask = task.filter(t => t.taskStatusId == this.TaskStatus.New);
      this.doneTask = task.filter(t => t.taskStatusId == this.TaskStatus.CompletedEarly
        || t.taskStatusId == this.TaskStatus.CompletedLate
        || t.taskStatusId == this.TaskStatus.CompletedOnTime);
    })
  }
  showListView(event) {
    this.listView = true;
    this.cardView = false;
    this.calender = false
  }
  updateTask(id: number) {
    this.OpenPopUp(
      AddTaskComponent,
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

  showCalender(event){
    this.cardView = false
    this.listView = false
    this.calender = true
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
        }]
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
