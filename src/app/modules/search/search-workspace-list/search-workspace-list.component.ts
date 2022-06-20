import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TaskPriority } from 'src/app/@AppService/Enums/task.priority';
import { TaskStatus } from 'src/app/@AppService/Enums/task.status';
import { TaskRequest } from 'src/app/@AppService/models/task/task.request.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';
import { Workspace } from 'src/app/@AppService/models/workspace.model';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { WorkspaceService } from 'src/app/@AppService/services/workspace.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { AddTaskComponent } from '../../task/add-task/add-task.component';

@Component({
  selector: 'app-search-workspace-list',
  templateUrl: './search-workspace-list.component.html',
  styleUrls: ['./search-workspace-list.component.scss'],
})
export class SearchWorkspaceListComponent extends BaseListComponent<Workspace,Workspace> implements OnChanges {

  filterGroup: FormGroup;
  @Input() searchKeyword : string;
  @Input() isSetInFilter : boolean;

  constructor(public workspacesService: WorkspaceService, private fb: FormBuilder) {
    super(workspacesService);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.filter()
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
    const name = this.searchKeyword;
    if (name) {
      filter['name'] = name;
    }
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 10, total: 100000000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.workspacesService.fetch(this.searchModel);
  }
  openProfile(id: number) {
    // debugger;
    this.navigateToUrl('/workspace/workspace-profile');
    this.workspacesService.workspaceId = id;
    //this.workspacesService.workspaceEmmiter.emit(id);
  }
}
