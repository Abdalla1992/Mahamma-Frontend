import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { confirmationType } from 'src/app/@AppService/Enums/confirmation-type';
import { MinuteOfMeetingLevel } from 'src/app/@AppService/Enums/meeting/minute-of-meeting-level';
import { BaseModel } from 'src/app/@AppService/models/base/base.model';
import { MeetingRequest } from 'src/app/@AppService/models/meeting/meeting-request.model';
import { MeetingResponse } from 'src/app/@AppService/models/meeting/meeting-response.model';
import { MinuteOfMeetingActionResponse } from 'src/app/@AppService/models/meeting/minute-of-meeting-action-response.model';
import { MinuteOfMeetingRequest } from 'src/app/@AppService/models/meeting/minute-of-meeting-request.model';
import { MinuteOfMeetingUpdateRequest } from 'src/app/@AppService/models/meeting/minute-of-meeting-update-request.model';
import { ApiResponse } from 'src/app/@AppService/models/response.model';
import { MeetingService } from 'src/app/@AppService/services/meeting/meeting.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { ConfirmationComponent } from 'src/app/@core/Component/confirmation/confirmation/confirmation.component';
import { AddProjectComponent } from '../../project/add-project/add-project.component';
import { AddSubTaskComponent } from '../../subtask/add-sub-task/add-sub-task.component';
import { AddTaskComponent } from '../../task/add-task/add-task.component';
import { MinuteOfMeetingDescription } from '../minute-of-meeting-description/minute-of-meeting-description.component';

@Component({
  selector: 'app-minutes-of-meeting-list',
  templateUrl: './minutes-of-meeting-list.component.html',
  styleUrls: ['./minutes-of-meeting-list.component.scss']
})
export class MinutesOfMeetingListComponent extends BaseListComponent<MeetingRequest, MeetingResponse> implements OnInit, OnChanges {

  minutesOfMeeting: MinuteOfMeetingActionResponse[];
  @Input() meetingId: number;

  public get MinuteOfMeetingLevel(): typeof MinuteOfMeetingLevel {
    return MinuteOfMeetingLevel;
  }

  constructor(public meetingService: MeetingService) {
    super(meetingService);
    
  }

  ngOnInit(): void {
    this.meetingService.getMinutesMeeting(this.meetingId).subscribe(response => 
    {
      this.minutesOfMeeting = response.result.responseData;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  filterForm(): void {
    throw new Error('Method not implemented.');
  }
  filter(): void {
    throw new Error('Method not implemented.');
  }

  prepareEntity(minuteOfMeetingId: number, description: string) : MinuteOfMeetingUpdateRequest {
    return {
      meetingId: this.meetingId,
      minuteOfMeetingId: minuteOfMeetingId,
      description: description
    } as MinuteOfMeetingUpdateRequest
  }

  updateMinuteOfMeeting(momId: number, actionLevel: number, workspaceId?: number, projectId?: number, taskId?: number, parentTaskId?: number, description?: string) {
    if(actionLevel == MinuteOfMeetingLevel.NoAction && description){
      this.OpenPopUp(MinuteOfMeetingDescription, { modalDialogClass: 'crud-process' }, [['id', momId], ['descriptionInput', description]],
      [
        ['descriptionOutput', (description : string) => {
          let momUpdateRequest = this.prepareEntity(momId, description);
          this.meetingService.updateMinuteMeeting(momUpdateRequest).subscribe(m => {});
        }]
      ]);
    }
    if(actionLevel == MinuteOfMeetingLevel.ExistingSubTask && parentTaskId && taskId && projectId){
      this.OpenPopUp(MinuteOfMeetingDescription, { modalDialogClass: 'crud-process' }, [['id', momId], ['descriptionInput', description]],
      [
        ['descriptionOutput', (description : string) => {
          let momUpdateRequest = this.prepareEntity(momId, description);
          this.meetingService.updateMinuteMeeting(momUpdateRequest).subscribe(m => {});
        }]
      ]);
    }
    else if(actionLevel == MinuteOfMeetingLevel.NewSubTask && parentTaskId && taskId && projectId){
      this.OpenPopUp(AddSubTaskComponent, { modalDialogClass: 'crud-process' }, [['id', taskId],['parentTaskId', parentTaskId], ['projectId', projectId],['isCreatedFromMeeting', true]],
      [['entityUpdatedOutput', (updated : boolean) => {}]]);
    }
    else if(actionLevel == MinuteOfMeetingLevel.ExistingTask && taskId && projectId){
      this.OpenPopUp(MinuteOfMeetingDescription, { modalDialogClass: 'crud-process' }, [['id', momId], ['descriptionInput', description]],
      [
        ['descriptionOutput', (description : string) => { 
          let momUpdateRequest = this.prepareEntity(momId,description); 
          this.meetingService.updateMinuteMeeting(momUpdateRequest).subscribe(m => {});
        }]
      ]);
    }
    else if(actionLevel == MinuteOfMeetingLevel.NewTask && taskId && projectId){
      this.OpenPopUp(AddTaskComponent, { modalDialogClass: 'crud-process' }, [['id', taskId],['projectId', projectId],['isCreatedFromMeeting', true]],
      [
        ['entityUpdatedOutput', (updated : boolean) => {}],
      ]);
    }
    else if(actionLevel == MinuteOfMeetingLevel.ExistingProject && projectId && workspaceId){
      this.OpenPopUp(MinuteOfMeetingDescription, { modalDialogClass: 'crud-process' }, [['id', momId], ['descriptionInput', description]],
      [
        ['descriptionOutput', (description : string) => { 
          let momUpdateRequest = this.prepareEntity(momId, description); 
          this.meetingService.updateMinuteMeeting(momUpdateRequest).subscribe(m => {});
        }]
      ]);
    }
    else if(actionLevel == MinuteOfMeetingLevel.NewProject && projectId && workspaceId){
      this.OpenPopUp(AddProjectComponent, { modalDialogClass: 'crud-process' },[['id', projectId],['workspaceId', workspaceId],['isCreatedFromMeeting', true]],
      [['entityUpdatedOutput', (updated : boolean) => {}],
    ]);
    }
  }

  deleteMom(id: number) {
    const modalRef = this.modalService.open(ConfirmationComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.componentType = confirmationType.Delete;
    modalRef.result.then(
      (response) => {
        this.deleteMomRecord(id, this.meetingId);
      },
      () => {}
    );
  }

  deleteMomRecord(id, meetingId) {
    this.meetingService
      .deleteMinuteMeeting(id, meetingId)
      .pipe(
        map((response: ApiResponse<boolean>) => {
          if (response.isValidResponse) {
            this.showSuccessMessage(response.result.commandMessage);
            this.ngOnInit();
          } else {
            this.showErrorMessages(response.errors);
          }
        }),

        catchError((errorMessage) => {
          this.errorOccured(errorMessage);
          return of(errorMessage);
        })
      )
      .subscribe((response: any) => {
        this.service.searchEntity(this.searchModel);
      });
  }
}