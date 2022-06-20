import { ProjectService } from './../../../@AppService/services/project.service';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/@AppService/models/project.model';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { AddProjectComponent } from '../add-project/add-project.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent extends BaseListComponent<Project,Project> implements OnInit{

  filterGroup: FormGroup;
  constructor(
    public projectService: ProjectService,
    private fb: FormBuilder
    )
     {
      super(projectService);
      this.addEditComponent = AddProjectComponent;
      this.searchModel = {
        filter: {},
        paginator: { page: 0, pageSize: 10, total: 1000, pageSizes: [] },
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
      paginator: { page: 0, pageSize: 10, total: 1000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.projectService.fetch(this.searchModel);
  }
}
