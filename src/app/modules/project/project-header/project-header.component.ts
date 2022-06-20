import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Project } from 'src/app/@AppService/models/project.model';
import { ProjectService } from './../../../@AppService/services/project.service';
import { ActivitiesComponent } from '../activities/activities.component';
import { confirmationType } from 'src/app/@AppService/Enums/confirmation-type';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ConfirmationComponent } from 'src/app/@core/Component/confirmation/confirmation/confirmation.component';
import { ProjectCharterComponent } from '../project-charter/project-charter.component';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
import { ApiResponse } from 'src/app/@AppService/models/response.model';
import { catchError, map } from 'rxjs/operators';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { of } from 'rxjs';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';
import { RateProjectMemberComponent } from '../rate-project-member/rate-project-member.component';

@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
})
export class ProjectHeaderComponent extends BaseComponent implements OnInit {
  @Input() project: Project;
  @Output() onUpdateProject = new EventEmitter<any>();

  private modalService: NgbModal;

  constructor(
    public projectService: ProjectService,
    public modal: NgbActiveModal
  ) {
    super();
    this.setUserPrivilage(Pages.ProjectProfile, SystemActions.ViewProject);
    const injector = AppInjector.getInjector();
    this.modalService = injector.get(NgbModal);
  }

  ngOnInit(): void {}

  openProjectActivities(projectId: number) {
    const modalRef = this.modalService.open(ActivitiesComponent, {
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.projectId = projectId;
  }

  updateProject(projectId: number) {
    const modalRef = this.modalService.open(AddProjectComponent, {
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.id = projectId;
    modalRef.componentInstance.entityId = this.project.workSpaceId;
    modalRef.componentInstance.reloadCurrentPage = true;
    modalRef.componentInstance.entityUpdatedOutput.subscribe((event) => {
      this.onUpdateProject.emit();
    });
  }

  deleteProject(entity: Project) {
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
    this.projectService
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
        this.navigateToUrlWithId(
          '/workspace/workspace-profile',
          this.project.workSpaceId
        );
      });
  }

  archiveProject(entity: Project) {
    const modalRef = this.modalService.open(ConfirmationComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.componentType = confirmationType.Archive;
    modalRef.result.then(() => this.archiveRecord(entity.id));
  }

  archiveRecord(id) {
    this.projectService
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
        this.navigateToUrlWithId(
          '/workspace/workspace-profile',
          this.project.workSpaceId
        );
      });
  }

  viewProjectCharter(projectId: number) {
    const modalRef = this.modalService.open(ProjectCharterComponent, {
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.projectId = projectId;
  }

  viewRiskPlan(id: number) {
    this.navigateToUrl('/project/project-risk-plan');
    this.projectService.projectId = id;
  }

  viewCommunicationPlan(id: number) {
    this.navigateToUrl('/project/project-communication-plan');
    this.projectService.projectId = id;
  }

  ViewMemberRating(project: Project) {
    const modalRef = this.modalService.open(RateProjectMemberComponent, {
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.projectMembers = project.members.filter(
      (m) => m.userId != this.project.creatorUserId
    );
  }
}
