import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TaskPriority } from 'src/app/@AppService/Enums/task.priority';
import { TaskStatus } from 'src/app/@AppService/Enums/task.status';
import { TaskRequest } from 'src/app/@AppService/models/task/task.request.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { AddSubTaskComponent } from '../add-sub-task/add-sub-task.component';

@Component({
  selector: 'app-card-sub-task-list',
  templateUrl: './card-sub-task-list.component.html',
  styleUrls: ['./card-sub-task-list.component.scss']
})
export class CardSubTaskListComponent extends BaseListComponent<TaskRequest, TaskResponse>{

  @Input() parentTaskId: number;
  @Input() projectId: number;
  @Input() isReadOnly : boolean = false;

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
    this.navigateToUrl('/sub-task/');
    this.taskService.taskId = id;
  }
}
