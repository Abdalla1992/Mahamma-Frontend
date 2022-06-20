import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MeetingService } from 'src/app/@AppService/services/meeting/meeting.service';
import { MeetingResponse } from 'src/app/@AppService/models/meeting/meeting-response.model';
import { WorkspaceService } from 'src/app/@AppService/services/workspace.service';
import { Workspace } from 'src/app/@AppService/models/workspace.model';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { SearchModel } from 'src/app/@AppService/models/common/search.model';
import { Project } from 'src/app/@AppService/models/project.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { MeetingRequest } from 'src/app/@AppService/models/meeting/meeting-request.model';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { AddTaskComponent } from '../../task/add-task/add-task.component';
import { AddSubTaskComponent } from '../../subtask/add-sub-task/add-sub-task.component';
import { AddProjectComponent } from '../../project/add-project/add-project.component';
import { MinuteOfMeetingRequest } from 'src/app/@AppService/models/meeting/minute-of-meeting-request.model';
import { ActivatedRoute } from '@angular/router';
import { MinuteOfMeetingLevel } from 'src/app/@AppService/Enums/meeting/minute-of-meeting-level';
import { MinuteOfMeetingDescription } from '../minute-of-meeting-description/minute-of-meeting-description.component';
import { DurationUnitType } from 'src/app/@AppService/Enums/duration-unit-type';
import { MinuteOfMeetingPublishRequest } from 'src/app/@AppService/models/meeting/minute-of-meeting-publish-request.model';

@Component({
  selector: 'app-minutes-of-meeting',
  templateUrl: './minutes-of-meeting.component.html',
  styleUrls: ['./minutes-of-meeting.component.scss']
})
export class MinutesOfMeetingComponent extends BaseListComponent<MeetingRequest, MeetingResponse> implements OnInit
{

  searchModel: SearchModel;

  meetingId : number;
  meeting: MeetingResponse;
  workspaceList : Workspace[] = [];
  projectList : Project[] = [];
  taskList : TaskResponse[] = [];
  subtaskList : TaskResponse[] = [];
  attendees : number[] = [];

  meetingLevelIsGeneral: boolean = false;
  meetingLevelIsWorkspace: boolean = false;
  meetingLevelIsProject: boolean = false;
  meetingLevelIsTask: boolean = false;

  workspaceId?: number;
  projectId?: number;
  taskId?: number;
  subTaskId?: number;
  // description: string;

  noAction : boolean;
  targetNewProject : boolean;
  targetExistingProject : boolean;
  targetNewTask : boolean;
  targetExistingTask : boolean;
  targetNewSubTask : boolean;
  targetExistingSubTask : boolean;
  
  meetingFinishDate: Date;

  constructor(
    private route: ActivatedRoute,
    private meetingService: MeetingService,
    public workspacesService: WorkspaceService,
    private projectService: ProjectService,
    public taskService: TaskService,
    public modal: NgbActiveModal)
  {
    super(meetingService);
    this.meetingId = Number(JSON.parse(this.route.snapshot.paramMap.get('id') || '0'));
    meetingService.getItemById(this.meetingId).subscribe(response =>
      {
        this.meeting = response.result.responseData;
        this.workspaceId = this.meeting.workspaceId;
        this.projectId = this.meeting.projectId;
        this.taskId = this.meeting.taskId;
        this.attendees = this.meeting.attendanceIdList || [];
        let meetingEndingIn = this.meeting.durationUnitType == DurationUnitType.Minutes ? this.meeting.duration * 60000 : (this.meeting.duration * 60) * 60000;
        this.meetingFinishDate = new Date(new Date(this.meeting.date).getTime() + meetingEndingIn)
        this.meetingLevelIsTask =  this.meeting.taskId ? true : false;
        this.meetingLevelIsProject = !this.meetingLevelIsTask && this.meeting.projectId ? true : false;
        this.meetingLevelIsWorkspace = !this.meetingLevelIsProject && this.meeting.workspaceId ? true : false;
        this.meetingLevelIsGeneral = !this.meetingLevelIsTask && !this.meetingLevelIsProject && !this.meetingLevelIsWorkspace;
        if(this.meetingLevelIsGeneral){
          this.loadWorkspaces();
        }
        else if(this.meetingLevelIsWorkspace){
          this.loadProjects();
        }
        else if(this.meetingLevelIsProject){
          this.loadTasks();
        }
        else if(this.meetingLevelIsTask){
          this.loadSubTasks();
        }
      });
  }

  ngOnInit(): void {
  }

  onAttendeeChecked(userId) {
    var index = this.attendees.indexOf(userId);
    if (index === -1) {
      this.attendees.push(userId);
    } else {
      this.attendees.splice(index, 1);
    }
  }

  onWorkspaceChange() {
    this.loadProjects();
  }

  onProjectChange() {
    this.loadTasks();
  }

  onTaskChange() {
    this.loadSubTasks();
  }
  
  onSubTaskChange() {
  }

  loadWorkspaces() {
    this.searchModel = {
      filter: {},
      paginator: { page: 0, pageSize: 1000000, total: 1000000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.workspacesService.find(this.searchModel).subscribe(response => {
      this.workspaceList = response.items;
    });
  }

  
  loadProjects() {
    const filter = {};
    filter['workSpaceId'] = this.workspaceId;
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 10000000, total: 100000000, pageSizes: [1,2,3] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.projectService.find(this.searchModel).subscribe(response => {
      this.projectList = response.items;
    });
  }

  loadTasks() {
    const filter = {};
    filter['projectId'] = this.projectId;
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 10000000, total: 100000000, pageSizes: [1,2,3] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.taskService.find(this.searchModel).subscribe(response => {
      this.taskList = response.items;
    });
  }

  loadSubTasks() {
    const filter = {};
    filter['projectId'] = this.projectId;
    filter['parentTaskId'] = this.taskId;
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 10000000, total: 100000000, pageSizes: [1,2,3] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.taskService.find(this.searchModel).subscribe(response => {
      this.subtaskList = response.items;
    });
  }

  resetTargetAction(){
    this.noAction = false;
    this.targetNewProject = false;
    this.targetExistingProject = false;
    this.targetNewTask = false;
    this.targetExistingTask = false;
    this.targetNewSubTask = false;
    this.targetExistingSubTask = false;
  }

  noActionNeeded(){
    this.resetTargetAction();
    this.noAction = true;
  }

  existingProjectAction(){
    this.resetTargetAction();
    this.targetExistingProject = true;
  }

  newProjectAction(){
    this.resetTargetAction();
    this.targetNewProject = true;
  }
  
  newTaskAction(){
    this.resetTargetAction();
    this.targetNewTask = true;
  }
  
  existingTaskAction(){
    this.resetTargetAction();
    this.targetExistingTask = true;
  }

  newSubTaskAction(){
    this.resetTargetAction();
    this.targetNewSubTask = true;
  }

  existingSubTaskAction(){
    this.resetTargetAction();
    this.targetExistingSubTask = true;
  }


  addNewAction(){
    if(this.noAction){
      this.OpenPopUp(MinuteOfMeetingDescription, { modalDialogClass: 'crud-process' }, [],
      [
        ['descriptionOutput', (description : string) => { this.submitAction(description, undefined, undefined); }]
      ]);
    }
    if(this.subTaskId && this.targetExistingSubTask){
      this.OpenPopUp(MinuteOfMeetingDescription, { modalDialogClass: 'crud-process' }, [],
      [
        ['descriptionOutput', (description : string) => { this.submitAction(description, undefined, this.subTaskId); }]
      ]);
    }
    else if(this.taskId && this.targetNewSubTask){
      this.OpenPopUp(AddSubTaskComponent, { modalDialogClass: 'crud-process' }, [['parentTaskId', this.taskId], ['projectId', this.projectId],['isCreatedFromMeeting', true]],
      [
        ['entityCreated', (entityId : number) => { this.submitAction(undefined, undefined, entityId); } 
      ]]);
    }
    else if(this.taskId && this.targetExistingTask){
      this.OpenPopUp(MinuteOfMeetingDescription, { modalDialogClass: 'crud-process' }, [],
      [
        ['descriptionOutput', (description : string) => { this.submitAction(description, undefined, this.taskId); }]
      ]);
    }
    else if(this.projectId && this.targetNewTask){
      this.OpenPopUp(AddTaskComponent, { modalDialogClass: 'crud-process' }, [['projectId', this.projectId],['isCreatedFromMeeting', true]],
      [
        ['entityCreated', (entityId : number) => { this.submitAction(undefined, undefined, entityId); }]
      ]);
    }
    else if(this.projectId && this.targetExistingProject){
      this.OpenPopUp(MinuteOfMeetingDescription, { modalDialogClass: 'crud-process' }, [],
      [
        ['descriptionOutput', (description : string) => { this.submitAction(description, this.projectId, undefined); }]
      ]);
    }
    else if(this.workspaceId && this.targetNewProject){
      this.OpenPopUp(AddProjectComponent, { modalDialogClass: 'crud-process' },[['workspaceId', this.workspaceId],['isCreatedFromMeeting', true]],
      [
        ['entityCreated', (entityId : number) => { this.submitAction(undefined, entityId, undefined); }]
      ]);
    }
  }

  submitAction(description?: string, projectId?: number, taskId?: number){
    let minuteOfMeetingLevel : MinuteOfMeetingLevel = MinuteOfMeetingLevel.NoAction;
    if(this.targetNewProject)
      minuteOfMeetingLevel =  MinuteOfMeetingLevel.NewProject;
    if(this.targetExistingProject)
      minuteOfMeetingLevel =  MinuteOfMeetingLevel.ExistingProject;
    if(this.targetNewTask)
      minuteOfMeetingLevel =  MinuteOfMeetingLevel.NewTask;
    if(this.targetExistingTask)
      minuteOfMeetingLevel =  MinuteOfMeetingLevel.ExistingTask;
    if(this.targetNewSubTask)
      minuteOfMeetingLevel =  MinuteOfMeetingLevel.NewSubTask;
    if(this.targetExistingSubTask)
      minuteOfMeetingLevel =  MinuteOfMeetingLevel.ExistingSubTask;
    
    let minuteOfMeeting : MinuteOfMeetingRequest = {
      meetingId: this.meetingId,
      description: description,
      projectId: projectId,
      taskId: taskId,
      minuteOfMeetingLevel: Number(minuteOfMeetingLevel)
    }
    this.meetingService.addMinuteMeeting(minuteOfMeeting).subscribe(m => 
      {
        //refresh page
        if(m.isValidResponse)
        {
          this.showSuccessMessage("Minute Of Meeting Added Successfully");
          this.meetingService.refresherMinuteOfMeeting();
        }
      });
  }

  publishMinutesOfMeeting(){
    let request : MinuteOfMeetingPublishRequest = {
      meetingId : this.meetingId,
      attendees : this.attendees
    } 
    this.meetingService.publishMinutesOfMeeting(request).subscribe(m => {
      if(m.isValidResponse)
        {
          this.showSuccessMessage("Minute Of Meeting Published Successfully");
        }
    })
  }

  filterForm(): void {
    throw new Error('Method not implemented.');
  }
  filter(): void {
    throw new Error('Method not implemented.');
  }

}
