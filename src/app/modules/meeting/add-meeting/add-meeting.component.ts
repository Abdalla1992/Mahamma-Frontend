import { MeetingResponse } from './../../../@AppService/models/meeting/meeting-response.model';
import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MeetingRequest } from 'src/app/@AppService/models/meeting/meeting-request.model';
import { MemberModel, SearchUserForProject, SearchUserForTask, SearchUserForWorkspace } from 'src/app/@AppService/models/search.member.model';
import { MeetingService } from 'src/app/@AppService/services/meeting/meeting.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';
import { AgendaTopic } from 'src/app/@AppService/models/meeting/agenda-topic-model';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { WorkspaceService } from 'src/app/@AppService/services/workspace.service';
import { Project } from 'src/app/@AppService/models/project.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';
import { SearchModel } from 'src/app/@AppService/models/common/search.model';
import { Workspace } from 'src/app/@AppService/models/workspace.model';
import { CompanyService } from 'src/app/@AppService/services/company.service';
import { UserService } from 'src/app/@AppService/services/user.service';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';
import { MeetingRole } from 'src/app/@AppService/Enums/meeting/meeting-role';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MemberMeetingRoles, MemberMeetingRolesRequest } from 'src/app/@AppService/models/meeting/member-meeting-roles-model';
import { FileInfo } from 'src/app/@AppService/models/common.model';
import { FileContent } from 'src/app/@AppService/models/file-content.model';
import { MeetingFile } from 'src/app/@AppService/models/meeting/meeting-file-model';
import { url } from 'inspector';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss']
})
export class AddMeetingComponent extends BaseAddEditComponent<MeetingRequest, MeetingResponse> implements OnInit {

  @Input() taskId?: number;
  @Input() projectId?: number;
  @Input() workspaceId?: number;
  private webFile: File;
  fielInfo: FileInfo = {
    fileUrl: '',
    fileExtention: '',
    fileName: '',
    fileSize: '',
  };
  private _users$ = new BehaviorSubject<MemberModel[]>([]);
  get users$() {
    return this._users$.asObservable();
  }

  private _projects$ = new BehaviorSubject<Project[]>([]);
  get projects$() {
    return this._projects$.asObservable();
  }

  public get MeetingRole(): typeof MeetingRole {
    return MeetingRole;
  }

  formGroup: FormGroup;
  searchModel: SearchModel;

  //drop downs
  workspaceList: Workspace[] = [];
  projectList: Project[] = [];
  taskList: TaskResponse[] = [];
  userList: MemberModel[] = [];

  // selected lists
  agendaTopics: AgendaTopic[] = [];
  meetingFiles: MeetingFile[] = [];
  selectedUserList: number[] = [];
  membersWithMeetingRoles: Array<MemberMeetingRoles> = [];


  showWorkspace: boolean = false;
  showProject: boolean = false;
  showTask: boolean = false;

  targetGeneral: boolean = false;
  targetWrokspace: boolean = false;
  targetProject: boolean = false;
  targetTask: boolean = false;
  attachments: Array<FileContent> = [];
  meetingRoles: Array<MeetingRole> = [];

  constructor(
    private fb: FormBuilder,
    private meetingService: MeetingService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private companyService: CompanyService,
    private workspacesService: WorkspaceService,
    private projectService: ProjectService,
    private taskService: TaskService,
    public modal: NgbActiveModal
  ) {
    super(meetingService, modal);
    this.setUserPrivilage(Pages.ManageMeetings, SystemActions.AddMeeting);
    this.meetingRoles = Object.keys(MeetingRole).filter(x => !isNaN(MeetingRole[x])).map(x => (MeetingRole[x]));
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.showWorkspace = this.workspaceId == undefined;
    this.showProject = this.projectId == undefined;
    this.showTask = this.taskId == undefined;
    this.targetTask = this.taskId != undefined;
    this.targetProject = this.projectId != undefined && this.taskId == undefined;
    this.targetWrokspace = this.workspaceId != undefined && this.projectId == undefined && this.taskId == undefined;
    this.getInvitees();
    if (this.showWorkspace) {
      this.loadWorkspaces();
    }
    else if (this.showProject && this.workspaceId) {
      this.loadProjects();
    }
    else if (this.showTask && this.projectId) {
      this.loadTasks();
    }
  }

  onWorkspaceChange(event) {
    this.workspaceId = event.target.value;
    this.loadProjects();
    this.getInvitees();
  }

  onProjectChange(event) {
    this.projectId = event.target.value;
    this.loadTasks();
    this.getInvitees();
  }

  onTaskChange(event) {
    this.taskId = event.target.value;
    this.getInvitees();
  }

  onUserChecked(event) {
    let index = this.selectedUserList.indexOf(parseInt(event.target.value));
    if (index === -1) {
      this.selectedUserList.push(parseInt(event.target.value));
    } else {
      this.selectedUserList.splice(index, 1);
    }
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
      paginator: { page: 0, pageSize: 10000000, total: 100000000, pageSizes: [1, 2, 3] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.projectService.find(this.searchModel).subscribe(response => {
      this.projectList = response.items;
      this._projects$.next(this.projectList);
    });
  }

  loadTasks() {
    const filter = {};
    filter['projectId'] = this.projectId;
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 10000000, total: 100000000, pageSizes: [1, 2, 3] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.taskService.find(this.searchModel).subscribe(response => {
      this.taskList = response.items;
    });
  }

  resetTargetAction() {
    this.targetGeneral = false;
    this.targetWrokspace = false;
    this.targetProject = false;
    this.targetTask = false;
  }

  selectGeneral() {
    this.resetTargetAction();
    this.targetGeneral = true;
    this.getInvitees();
  }

  selectWorkspace() {
    this.resetTargetAction();
    this.targetWrokspace = true;
    this.getInvitees();
  }

  selectProject() {
    this.resetTargetAction();
    this.targetProject = true;
    this.getInvitees();
  }

  selectTask() {
    this.resetTargetAction();
    this.targetTask = true;
    this.getInvitees();
  }

  getInvitees() {
    if (this.targetGeneral || (this.id > 0 && !this.workspaceId && !this.projectId && !this.taskId)) {
      this.searchModel = {
        filter: {},
        paginator: { page: 0, pageSize: 10000000, total: 100000000, pageSizes: [] },
        sorting: { column: '', direction: 'asc' },
        entityId: 0,
      };
      this.userService.find(this.searchModel).subscribe(u => {
        this.userList = u.items.filter(u => {
          return u.id != this.authenticationService.currentUser().id
        }).map(m => {
          return {
            userId: m.id,
            fullName: m.fullName,
            profileImage: m.profileImage
          } as MemberModel;
        });
        this._users$.next(this.userList || []);
      });
    }
    else if (this.targetWrokspace && this.workspaceId) {
      let searchUserForWorkspace = {
        name: '',
        workspaceId: this.id,
      };
      this.companyService.searchUserForWorkspace(searchUserForWorkspace).subscribe(u => {
        this.userList = u.result.responseData
        this._users$.next(this.userList || []);
      });
    }
    else if (this.targetProject && this.projectId) {
      let searchUserForProject = {
        name: '',
        projectId: 0,
      };
      this.companyService.searchUserForProject(searchUserForProject).subscribe(u => {
        this.userList = u.result.responseData
        this._users$.next(this.userList || []);
      });
    }
    else if (this.targetTask && this.taskId) {
      let searchUserForTask = {
        name: '',
        taskId: 0,
      };
      this.companyService.searchUserForTask(searchUserForTask).subscribe(u => {
        this.userList = u.result.responseData
        this._users$.next(this.userList || []);
      });
    }
  }

  addAgenda(newTopic: string, newDuration: string) {
    let topic = {
      id: 0,
      topic: newTopic,
      durationInMinutes: Number(newDuration)
    } as AgendaTopic

    if (newTopic && newTopic.length > 0 && newDuration) {
      this.agendaTopics.push(topic);
    }
    this.formGroup.get('newTopic')?.setValue('');
    this.formGroup.get('newDuration')?.setValue('')
  }

  removeAgenda(agenda) {
    this.agendaTopics = this.agendaTopics.filter(g => g != agenda);
  }
  removeMeetingFile(file) {
    this.meetingFiles = this.meetingFiles.filter(g => g != file);
  }
  isInvited(userId): boolean {
    return (this.selectedUserList || []).includes(userId);
  }

  loadForm(): void {
    this.formGroup = this.fb.group({
      date: [
        formatDate(this.responseEntity.date, 'yyyy-MM-dd', 'en'),
        [Validators.compose([Validators.required])]
      ],
      time: [
        formatDate(this.responseEntity.date, 'HH:mm', 'en'),
        [Validators.compose([Validators.required])]
      ],
      duration: [
        this.responseEntity.duration,
        Validators.compose([Validators.required]),
      ],
      durationUnitType: [
        this.responseEntity.durationUnitType || 1,
      ],
      meetingType: [
        this.responseEntity.isOnline,
      ],
      title: [
        this.responseEntity.title,
        Validators.compose([Validators.required]),
      ],

    });
    if (this.responseEntity) {
      this.agendaTopics = this.responseEntity?.agendaTopics || [];
      this.selectedUserList = Object.keys(this.responseEntity.memberList || []).map(x => Number(x)) || [];


        this.meetingFiles = this.responseEntity?.meetingFiles || [];


      if (this.responseEntity.memberList) {
        this.users$.subscribe(users => {
          this.membersWithMeetingRoles = [];
          if (this.responseEntity.memberList) {
            for (let user of users) {
              this.membersWithMeetingRoles.push({ user: user, meetingRole: this.responseEntity.memberList[user.userId.toString()] } as MemberMeetingRoles);
            }
          }
        });
      }
    }
  }

  prepareEntity(): void {
    const formData = this.formGroup.value;
    this.entity.id = this.id;
    this.entity.members = this.membersWithMeetingRoles.filter(m => this.selectedUserList.includes(m.user.userId)).map(x => ({ userId: x.user.userId, meetingRoles: x.meetingRole } as MemberMeetingRolesRequest));
    this.entity.date = new Date(formData.date + ' ' + formData.time);
    this.entity.duration = formData.duration;
    this.entity.durationUnitType = formData.durationUnitType;
    this.entity.isOnline = formData.meetingType === 'true' ? true : false;
    this.entity.title = formData.title;
    this.entity.agenda = this.agendaTopics;
    this.entity.workspaceId = this.workspaceId;
    this.entity.projectId = this.projectId;
    this.entity.taskId = this.taskId;
    this.entity.meetingFiles=this.meetingFiles;
  }

  clearEntity(): void {
    if (this.entity == undefined || this.entity == null) return;

    this.entity.id = 0;
    this.entity.members = [];
    this.entity.date = new Date();
    this.entity.duration = 0;
    this.entity.durationUnitType = 0;
    this.entity.isOnline = false;
    this.entity.title = '';
    this.entity.agenda = [];
    this.entity.workspaceId = 0;
    this.entity.projectId = 0;
    this.entity.taskId = 0;
    this.entity.meetingFiles = [];
  }

  emptyEntity(): MeetingRequest {
    return {
      id: undefined,
      title: '',
      date: new Date(),
      activationStatus: '',
      members: [],
      workspaceId: 0,
      taskId: 0,
      projectId: 0,
      duration: 0,
      durationUnitType: 0,
      agenda: [],
      isOnline: false,
      meetingFiles: []
    };
  }

  emptyResponseEntity(): MeetingResponse {
    return {
      id: undefined,
      title: '',
      duration: 0,
      durationUnitType: 0,
      date: new Date(),
      activationStatus: '',
      memberList: [],
      workspaceId: 0,
      projectId: 0,
      taskId: 0,
      creatorUserId: 0,
      agendaTopics: [],
      members: [],
      isOnline: false,
      joinUrl: '',
      meetingFiles: []
    };
  }
  processWebDataFile(webFileInput: any) {
    this.webFile = webFileInput.files[0];

    if (this.webFile) {
      this.fielInfo.fileName = this.webFile.name;
      this.fielInfo.fileExtention = this.webFile.type;
      const size = this.webFile.size / Math.log(1024);
      this.fielInfo.fileSize = Math.round(size).toString() + ' KB';

      this.authService.uploadFile(this.webFile).subscribe(
        (response: FileContent) => {
          if (response) {
            console.log(response.actualFileName)
            console.log(response.fileName)
            this.meetingFiles.push({id:0,name:response.actualFileName,meetingId:this.id,url:response.fileUrl})
          }
        },
        (err) => {
          //this.errorOccured(err);
        }
      );
    }
  }
}
