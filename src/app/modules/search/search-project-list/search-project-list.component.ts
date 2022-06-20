import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Project } from 'src/app/@AppService/models/project.model';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';

@Component({
  selector: 'app-search-project-list',
  templateUrl: './search-project-list.component.html',
  styleUrls: ['./search-project-list.component.scss'],
})
export class SearchProjectListComponent extends BaseListComponent<Project, Project> implements OnChanges {

  filterGroup: FormGroup;
  @Input() searchKeyword : string;
  @Input() isSetInFilter : boolean;

  constructor(public projectService: ProjectService, private fb: FormBuilder) {
    super(projectService);
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
      entityId: 1,
    };
    this.projectService.fetch(this.searchModel);
  }
  openProfile(id: number) {
    // debugger;
    this.navigateToUrl('/project/project-profile');
    this.projectService.projectId = id;
    //this.projectService.workspaceEmmiter.emit(id);
  }
}
