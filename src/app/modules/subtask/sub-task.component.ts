import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { confirmationType } from 'src/app/@AppService/Enums/confirmation-type';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';
import { TaskStatus } from 'src/app/@AppService/Enums/task.status';
import { FileContent } from 'src/app/@AppService/models/file-content.model';
import { ProjectAttachment } from 'src/app/@AppService/models/project.attachment.model';
import { ApiResponse } from 'src/app/@AppService/models/response.model';
import { TaskRequest } from 'src/app/@AppService/models/task/task.request.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { ConfirmationComponent } from 'src/app/@core/Component/confirmation/confirmation/confirmation.component';
import { SubmitTaskComponent } from '../task/submit-task/submit-task.component';
import { AddSubTaskComponent } from './add-sub-task/add-sub-task.component';
import { InviteMembersDialogComponent } from './invite-members-dialog/invite-members-dialog.component';
import { ReviewSubTaskComponent } from './review-sub-task/review-sub-task.component';
import { SubTaskActivitiesComponent } from './sub-task-activities/sub-task-activities.component';
import { UpdateProgressPercentageComponent } from './update-progress-percentage/update-progress-percentage.component';

@Component({
  selector: 'app-sub-task',
  templateUrl: './sub-task.component.html',
  styleUrls: ['./sub-task.component.scss'],
})
export class SubTaskComponent extends BaseListComponent<
TaskRequest,
TaskResponse
> {
  task: TaskResponse;
  taskId: number;
  projectId: number;

  public get TaskStatus(): typeof TaskStatus {
    return TaskStatus;
  }
  
  public get SystemActions(): typeof SystemActions {
    return SystemActions;
  }

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService) 
  {
      super(taskService);
      this.setUserPrivilage(Pages.SubtaskProfile,SystemActions.ViewTask)
      this.taskId = this.taskId || Number(JSON.parse(this.route.snapshot.paramMap.get('id') || '0'));
  }
  ngOnInit() {
    this.getTask();
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    // Your logic on beforeunload
    this.saveToSession(this.taskId);
  }
  getTask() {
    this.taskService.GetTask(this.taskId).subscribe((task) => {
      this.task = task.result.responseData;
      this.projectId = this.task.projectId;
    });
  }

  openTaskSubmit() {
    this.OpenPopUp(
      SubmitTaskComponent,
      { modalDialogClass: 'crud-process' },
      [
        ['taskId', this.taskId],
        ['reloadCurrentPage', true],
      ],
      [[
        'entityUpdatedOutput',
        (event) => {
          this.ngOnInit();
        },
      ]]
    );
  }

  openInviteMember() {
    this.OpenPopUp(
      InviteMembersDialogComponent,
      { modalDialogClass: 'crud-process' },
      [
        ['id', this.taskId],
        ['members', this.task.members],
      ]
    );
  }

  updateTask() {
    this.OpenPopUp(
      AddSubTaskComponent,
      { modalDialogClass: 'crud-process' },
      [
        ['id', this.taskId],
        ['projectId', this.projectId],
        ['reloadCurrentPage', true],
      ],
      [[
        'entityUpdatedOutput',
        (event) => {
          this.ngOnInit();
        },
      ]]
    );
  }

  updateProgressPercentagePopup() {
    this.OpenPopUp(
      UpdateProgressPercentageComponent,
      { modalDialogClass: 'crud-process' },
      [
        ['taskId', this.taskId],
        ['progressPercentage', this.task.progressPercentage]
      ],
      [
        ['progressPercentageUpdatedOutput',
        (event) => {
          this.ngOnInit();
        }]
      ]
    );
  }

  filterForm() { }
  filter(): void { }

  openActivity() {
    this.OpenPopUp(
      SubTaskActivitiesComponent,
      { modalDialogClass: 'crud-process' },
      [['taskId', this.taskId]]
    );
  }
  handleUploadedFiles(uploadedFiles: FileContent[]) {
    this.projectService
      .addProjectFiles(this.projectId, uploadedFiles, this.taskId)
      .subscribe((response) => {
        if (response.isValidResponse) {
          //this.task.taskAttachments = response.result.responseData;
          this.ngOnInit();
        }
      });
  }
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
      () => { }
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
      () => { }
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
        // this.router.navigate(['/task/' + this.task.parentTaskId]);
        this.navigateToUrl(
          '/task/'
        );
        this.taskService.taskId = this.taskId;
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
      () => { }
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
        //this.router.navigate(['/task/' + this.task.parentTaskId]);
        this.navigateToUrl(
          '/task/'
        );
        this.taskService.taskId = this.taskId;
        // this.service.searchEntity(this.searchModel);
      });
  }
  reviewTaskPopup() {
    this.OpenPopUp(ReviewSubTaskComponent,
      {},
      [['id', this.taskId],
      ['members', this.task.taskMembers]]
    );
  }

  navigateToTask(taskId: any){
    this.taskService.taskId = taskId;
    this.navigateToUrl('/task/');
  }
}
