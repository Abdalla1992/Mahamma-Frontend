import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Project } from 'src/app/@AppService/models/project.model';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { InviteMembersDialogComponent } from 'src/app/modules/project/invite-members-dialog/invite-members-dialog.component';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.scss']
})
export class MyInfoComponent  extends BaseListComponent<Project,Project>{

  // // ngOnInit(): void {
  // // }

  filterGroup: FormGroup;
  addEditComponent: any;
  // searchModel: { filter: {}; paginator: { page: number; pageSize: number; total: number; pageSizes: never[]; }; sorting: { column: string; direction: string; }; entityId: number; };
  subscriptions: any;
  constructor(
    public projectService: ProjectService,
    private fb: FormBuilder
    )
     {
      super(projectService);
      this.addEditComponent = InviteMembersDialogComponent;
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
    this.projectService.fetch(this.searchModel);
  }



}
