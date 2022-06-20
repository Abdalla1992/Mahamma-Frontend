import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubTask } from 'src/app/@AppService/models/subTask.model';
import { SubTaskService } from 'src/app/@AppService/services/sub-task.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { SubmitTaskComponent } from '../../task/submit-task/submit-task.component';

@Component({
  selector: 'app-sub-task-header',
  templateUrl: './sub-task-header.component.html',
  styleUrls: ['./sub-task-header.component.scss']
})
export class SubTaskHeaderComponent extends BaseListComponent<SubTask>{

  filterGroup: FormGroup;

  constructor(
    public _subTaskService: SubTaskService,
    private fb: FormBuilder,
    public modal: NgbActiveModal
    )
    {
    super(_subTaskService);
    this.addEditComponent = SubmitTaskComponent ;
    this.searchModel = {
      filter: {},
      paginator: { page: 0, pageSize: 6, total: 1000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
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
    const name = this.filterGroup.controls['name'].value;
    if (name) {
      filter['name'] = name;
    }
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 6, total: 1000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this._subTaskService.fetch(this.searchModel);
  }

}
