import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import { TaskPriority } from 'src/app/@AppService/Enums/task.priority';
import { TaskStatus } from 'src/app/@AppService/Enums/task.status';
import { TaskRequest } from 'src/app/@AppService/models/task/task.request.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { AddTaskComponent } from '../add-task/add-task.component';


@Component({
  selector: 'app-card-task-list',
  templateUrl: './card-task-list.component.html',
  styleUrls: ['./card-task-list.component.scss']
})
export class CardTaskListComponent extends BaseListComponent<TaskRequest, TaskResponse>
implements OnInit {
    @Input() isReadOnly: boolean = false;
    @Input() projectId: number;
    @Input() workspaceId: number;

    filterGroup: FormGroup;

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
    ngOnInit() {
      const filter = {};
      filter['projectId'] = this.projectId;
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
      const name = this.filterGroup.controls['name'].value;
      if (name) {
        filter['name'] = name;
      }
      this.searchModel = {
        filter: filter,
        paginator: { page: 0, pageSize: 10000000, total: 100000000, pageSizes: [] },
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
}
