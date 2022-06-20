import { ActivatedRoute, Router } from '@angular/router';
import { Company } from './../../../@AppService/models/company.model';
import { CompanyService } from './../../../@AppService/services/company.service';
import { WorkspaceService } from 'src/app/@AppService/services/workspace.service';
import { Workspace } from 'src/app/@AppService/models/workspace.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddEditWorkspaceComponent } from '../add-edit-workspace/add-edit-workspace.component';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';

@Component({
  selector: 'app-list-workspace',
  templateUrl: './list-workspace.component.html',
  styleUrls: ['./list-workspace.component.scss'],
})
export class ListWorkspaceComponent extends BaseListComponent<Workspace,Workspace> {

  searchKeyword: string;
  filterGroup: FormGroup;
  company: Company;
  constructor(
    public workspacesService: WorkspaceService,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private routers: Router
  ) {
    super(workspacesService);
    this.setUserPrivilage(Pages.WorkspaceProfile, SystemActions.ViewWorkspace);
    this.addEditComponent = AddEditWorkspaceComponent;
    this.searchModel = {
      filter: {},
      paginator: { page: 0, pageSize: 1000000, total: 1000000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
  }

  ngOnInit() {
    super.ngOnInit();
    this.companyService.getCompanyById().subscribe((result) => {
      if (result.isValidResponse) this.company = result.result.responseData;
    });
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
    //  debugger;
    const filter = {};
    const name = this.filterGroup.controls['name'].value;
    this.searchKeyword = name
    if (name) {
      filter['name'] = name;
    }
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 1000000, total: 1000000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.workspacesService.fetch(this.searchModel);
  }
  openWorkspacProfile(id: number) {
    // debugger;
    this.workspacesService.workspaceId = id;
    this.navigateToUrl('/workspace/workspace-profile');
    //this.workspacesService.workspaceEmmiter.emit(id);
  }
}
