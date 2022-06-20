import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { confirmationType } from 'src/app/@AppService/Enums/confirmation-type';
import { Pages } from 'src/app/@AppService/Enums/security';
import { TaskStatus } from 'src/app/@AppService/Enums/task.status';
import { FileContent } from 'src/app/@AppService/models/file-content.model';
import { ProjectAttachment } from 'src/app/@AppService/models/project.attachment.model';
import { ApiResponse } from 'src/app/@AppService/models/response.model';
import { MemberModel } from 'src/app/@AppService/models/search.member.model';
import { TaskRequest } from 'src/app/@AppService/models/task/task.request.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { ConfirmationComponent } from 'src/app/@core/Component/confirmation/confirmation/confirmation.component';
import { IDynamicComponent } from '../shared/dynamic-loader/contracts/dynamic-component';
import { AddTaskComponent } from './add-task/add-task.component';
import { InviteMembersDialogComponent } from './invite-members-dialog/invite-members-dialog.component';
import { RateMemberTaskComponent } from './rate-member-task/rate-member-task.component';
import { ReviewTaskComponent } from './review-task/review-task.component';
import { SubmitTaskComponent } from './submit-task/submit-task.component';
import { TaskActivitiesComponent } from './task-activities/task-activities.component';
import { UpdateProgressPercentageComponent } from './update-progress-percentage/update-progress-percentage.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent
  extends BaseListComponent<TaskRequest, TaskResponse>
  implements OnInit, IDynamicComponent {
  id: number;
  isReadOnly: boolean;
  filterGroup: FormGroup;
  task: TaskResponse;
  projectId: number;
  workspaceId: number;
  canReview: boolean;
  canSubmit: boolean;

  public get TaskStatus(): typeof TaskStatus {
    return TaskStatus;
  }

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private projectService: ProjectService,
    private authentedService: AuthenticationService,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    public _http: HttpClient,
    public datepipe: DatePipe
  ) {
    super(taskService);
    this.setUserPrivilage(Pages.ProjectProfile, this.SystemActions.ViewTask);
    this.setUserPrivilage(
      Pages.ProjectProfile,
      this.SystemActions.AssignMember
    );

    if (this.taskService.taskId > 0) {
      this.id = this.taskService.taskId;
    } else {
      this.id = this.readSession();
    }
    // Number(
    //   JSON.parse(this.route.snapshot.paramMap.get('id') || '0')
    // );
    this.searchModel = {
      filter: {},
      paginator: { page: 0, pageSize: 6, total: 1000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: this.id,
    };
  }
  ngOnInit() {
    this.taskService.GetTask(this.id).subscribe((task) => {
      this.task = task.result.responseData;
      this.projectId = this.task.projectId;
      this.projectService.getItemById(this.projectId).subscribe((response) => {
        this.workspaceId = response.result.responseData.workSpaceId;
      });
      this.canSubmit =
        this.task.creatorUserId == this.authentedService.currentUser().id &&
        this.task.taskStatusId != TaskStatus.CompletedEarly &&
        this.task.taskStatusId != TaskStatus.CompletedOnTime &&
        this.task.taskStatusId != TaskStatus.CompletedLate;

      this.canReview =
        this.task.creatorUserId == this.authentedService.currentUser().id &&
        this.task.reviewRequest == true &&
        (this.task.taskStatusId == TaskStatus.CompletedEarly ||
          this.task.taskStatusId == TaskStatus.CompletedOnTime ||
          this.task.taskStatusId == TaskStatus.CompletedLate);
    });
  }
  openActivity() {
    this.OpenPopUp(
      TaskActivitiesComponent,
      { modalDialogClass: 'crud-process' },
      [['taskId', this.id]]
    );
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    // Your logic on beforeunload
    this.saveToSession(this.id);
  }
  openTaskSubmit() {
    this.OpenPopUp(
      SubmitTaskComponent,
      { modalDialogClass: 'crud-process' },
      [
        ['taskId', this.id],
        ['reloadCurrentPage', true],
      ],
      [
        [
          'entityUpdatedOutput',
          (event) => {
            this.ngOnInit();
          },
        ],
      ]
    );
  }

  openInviteMember() {
    this.OpenPopUp(
      InviteMembersDialogComponent,
      { modalDialogClass: 'crud-process' },
      [
        ['id', this.id],
        ['members', this.task.members],
      ]
    );
  }

  updateTask() {
    this.OpenPopUp(
      AddTaskComponent,
      { modalDialogClass: 'crud-process' },
      [
        ['id', this.id],
        ['projectId', this.projectId],
        ['reloadCurrentPage', true],
      ],
      [
        [
          'entityUpdatedOutput',
          (event) => {
            this.ngOnInit();
          },
        ],
      ]
    );
  }

  handleUploadedFiles(uploadedFiles: FileContent[]) {
    this.projectService
      .addProjectFiles(this.projectId, uploadedFiles, this.id)
      .subscribe((response) => {
        if (response.isValidResponse) {
          //this.task.taskAttachments = response.result.responseData;
          this.ngOnInit();
        }
      });
  }

  filterForm() {}

  filter() {}

  removeFile(projectFile: ProjectAttachment) {
    const modalRef = this.modalService.open(ConfirmationComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.componentType = confirmationType.Delete;
    modalRef.result.then(
      (response) => {
        this.deleteProjectFile(projectFile.id);
      },
      () => {}
    );
  }

  deleteProjectFile(id) {
    this.projectService.deleteProjectFile(id).subscribe((response) => {
      if (response.isValidResponse) {
        //this.task.taskAttachments = response.result.responseData;
        this.ngOnInit();
        this.showSuccessMessage(response.result.commandMessage);
      }
    });
  }
  vieaAllFiles() {
    this.router.navigate(['/documents/view-all-files'], {
      queryParams: { projectId: this.task.projectId, taskId: this.task.id },
    });
  }

  deleteTask(entity: TaskResponse) {
    const modalRef = this.modalService.open(ConfirmationComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.componentType = confirmationType.Delete;
    modalRef.result.then(
      (response) => {
        this.deleteRecord(entity.id);
      },
      () => {}
    );
  }

  deleteRecord(id) {
    this.taskService
      .delete(id)
      .pipe(
        map((response: ApiResponse<boolean>) => {
          if (response.isValidResponse) {
            this.showSuccessMessage(response.result.commandMessage);
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
        this.navigateToUrl('/project/project-profile');
        this.projectService.projectId = this.projectId;
        // this.service.searchEntity(this.searchModel);
      });
  }

  archiveTask(entity: TaskResponse) {
    const modalRef = this.modalService.open(ConfirmationComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.componentType = confirmationType.Archive;
    modalRef.result.then(
      (response) => {
        this.archiveRecord(entity.id);
      },
      () => {}
    );
  }

  archiveRecord(id) {
    this.taskService
      .archive(id)
      .pipe(
        map((response: ApiResponse<boolean>) => {
          if (response.isValidResponse) {
            this.showSuccessMessage(response.result.commandMessage);
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
        this.navigateToUrl('/prokect/prokect-profile');
        this.projectService.projectId = this.projectId;
        // this.service.searchEntity(this.searchModel);
      });
  }
  reviewTaskPopup() {
    this.OpenPopUp(ReviewTaskComponent, {}, [
      ['id', this.id],
      [
        'members',
        this.task.taskMembers?.filter(
          (m) => m.userId != this.task.creatorUserId.toString()
        ),
      ],
    ]);
  }

  rateMemberTaskPopup() {
    this.OpenPopUp(RateMemberTaskComponent, {}, [
      ['id', this.id],
      [
        'members',
        this.task.taskMembers?.filter(
          (m) => m.userId != this.task.creatorUserId.toString()
        ),
      ],
    ]);
  }

  myCustomColor = 'primary';
  mode = 'determinate';
  ShowLoader: boolean;
  myCustomValue: number = 50;
  pageload() {
    this.ShowLoader = true;

    for (let i = 0; i < 1000; i++) {
      const num = (i / 1000) * 100;
      setTimeout(() => {
        this.myCustomValue = num;
      }, 500);
    }
  }

  updateProgressPercentagePopup() {
    this.OpenPopUp(
      UpdateProgressPercentageComponent,
      { modalDialogClass: 'crud-process' },
      [
        ['taskId', this.id],
        ['progressPercentage', this.task.progressPercentage],
      ],
      [
        [
          'progressPercentageUpdatedOutput',
          (event) => {
            this.ngOnInit();
          },
        ],
      ]
    );
  }

  navigateToProject(projectId: any) {
    this.projectService.projectId = projectId;
    this.navigateToUrl('/project/project-profile/');
  }
}
