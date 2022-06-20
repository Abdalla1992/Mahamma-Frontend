import { Project } from '../../../@AppService/models/project.model';
import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { AddProjectComponent } from '../../project/add-project/add-project.component';
import { ActivatedRoute } from '@angular/router';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
import { map } from 'rxjs/operators';
import { WorkspaceService } from 'src/app/@AppService/services/workspace.service';
import { IDynamicComponent } from '../../shared/dynamic-loader/contracts/dynamic-component';
import { debug } from 'console';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';

@Component({
  selector: 'app-workspace-profile',
  templateUrl: './workspace-profile.component.html',
  styleUrls: ['./workspace-profile.component.scss'],
})
export class WorkspaceProfileComponent
  extends BaseListComponent<Project, Project>
  implements OnInit , IDynamicComponent {

  id: number;
  isReadOnly: boolean;
  project: boolean = true;
  filterGroup: FormGroup;
  constructor(
    public projectService: ProjectService,
    private workspaceService: WorkspaceService,
    private fb: FormBuilder,
  ) {
    super(projectService);
     this.setUserPrivilage(Pages.WorkspaceProfile,SystemActions.ViewWorkspace);
    //this.workspaceService.workspaceEmmiter.subscribe(result => {debugger;
    //this.workspaceId = result;}); //this.baseActivatedRoute.snapshot.queryParams['id'];
    if (this.workspaceService.workspaceId > 0) {
      this.id = this.workspaceService.workspaceId;
    } else {
      this.id = this.readSession();
    }
    this.entityId = this.id;
    this.addEditComponent = AddProjectComponent;
    const filter = {};
    filter['workSpaceId'] = this.id;
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 1000000, total: 1000000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
  }
  ngOnInit() {
    super.ngOnInit();
  }

  // ngOnDestroy(){
  //   debugger;
  //   this.saveToSession(this.workspaceId);
  //   super.ngOnDestroy();
  // }
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    // Your logic on beforeunload
    this.saveToSession(this.id);
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
    filter['workSpaceId'] = this.id;
    if (name) {
      filter['name'] = name;
    }
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 1000000, total: 1000000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.projectService.fetch(this.searchModel);
  }
  openProjectProfile(id: number) {
    this.navigateToUrl('/project/project-profile');
    this.projectService.projectId = id;
  }
}
