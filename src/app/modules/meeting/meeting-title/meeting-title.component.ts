import { MeetingService } from './../../../@AppService/services/meeting/meeting.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MeetingRequest } from 'src/app/@AppService/models/meeting/meeting-request.model';
import { MeetingResponse } from 'src/app/@AppService/models/meeting/meeting-response.model';
import { Project } from 'src/app/@AppService/models/project.model';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { WorkspaceService } from 'src/app/@AppService/services/workspace.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { AddMeetingComponent } from '../add-meeting/add-meeting.component';
import { Company } from 'src/app/@AppService/models/company.model';
import { CompanyService } from 'src/app/@AppService/services/company.service';
import { Router } from '@angular/router';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';
import { AddEditWorkspaceComponent } from '../../workspace/add-edit-workspace/add-edit-workspace.component';

@Component({
  selector: 'app-meeting-title',
  templateUrl: './meeting-title.component.html',
  styleUrls: ['./meeting-title.component.scss']
})
export class MeetingTitleComponent extends BaseListComponent<MeetingRequest, MeetingResponse>
implements OnInit {

  filterGroup: FormGroup;
  company: Company;
  constructor(
    public workspacesService: WorkspaceService,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private meetingService: MeetingService,
    private routers: Router
  ) {
    super(meetingService);
    this.setUserPrivilage(Pages.WorkspaceProfile, SystemActions.ViewWorkspace);
    this.addEditComponent = AddMeetingComponent;
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
  // openWorkspacProfile(id: number) {
  //   // debugger;
  //   this.workspacesService.workspaceId = id;
  //   this.navigateToUrl('/workspace/workspace-profile');
  //   //this.workspacesService.workspaceEmmiter.emit(id);
  // }
}
