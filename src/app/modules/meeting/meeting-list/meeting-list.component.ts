import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';
import { MeetingRequest } from 'src/app/@AppService/models/meeting/meeting-request.model';
import { MeetingResponse } from 'src/app/@AppService/models/meeting/meeting-response.model';
import { MeetingService } from 'src/app/@AppService/services/meeting/meeting.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { AddMeetingComponent } from '../add-meeting/add-meeting.component';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss']
})
export class MeetingListComponent extends BaseListComponent<MeetingRequest, MeetingResponse> implements OnInit {

  filterGroup: FormGroup;
  @Input() searchKeyword: string = '';
  @Input() workspaceId?: number = undefined;
  @Input() projectId?: number = undefined;
  @Input() taskId?: number = undefined;

  constructor(public meetingService: MeetingService, private fb: FormBuilder) {
    super(meetingService);
      this.setUserPrivilage(Pages.ManageMeetings,SystemActions.ViewMeeting)
  }

  ngOnInit(): void {
    this.filter();
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
    const name = null;
    if (name) {
      filter['title'] = name;
    }
    if (this.taskId) {
      filter['taskId'] = this.taskId;
    }
    if (this.projectId) {
      filter['projectId'] = this.projectId;
    }
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 10000000, total: 100000000, pageSizes: [1,2,3] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.meetingService.fetch(this.searchModel);
  }

  newMeeting() {
    this.OpenPopUp(
      AddMeetingComponent,
      { modalDialogClass: 'crud-process' },
      [
        ["workspaceId",this.workspaceId],
        ["projectId",this.projectId],
        ["taskId",this.taskId],
      ],
      [[
        'entityCreated',
        (event) => {
          this.showSuccessMessage("Meeting Added Successfully");
          this.ngOnInit();
        },
      ]]
    );
  }

  updateMeeting(id: number, workspaceId?: number, projectId?: number, taskId?: number) {
    this.OpenPopUp(
      AddMeetingComponent,
      { modalDialogClass: 'crud-process' },
      [
        ['id', id],
        ['workspaceId', workspaceId],
        ['projectId', projectId],
        ['taskId', taskId],
      ],
      [[
        'entityUpdatedOutput',
        (event) => {
          this.showSuccessMessage("Meeting Updated Successfully");
          this.ngOnInit();
        },
      ]]
    );
  }
}
