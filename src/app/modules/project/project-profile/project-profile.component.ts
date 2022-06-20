import { ProjectAttachment } from 'src/app/@AppService/models/project.attachment.model';
import { FileContent } from 'src/app/@AppService/models/file-content.model';
import { AddProjectComponent } from './../add-project/add-project.component';
import { InviteMembersDialogComponent } from 'src/app/modules/project/invite-members-dialog/invite-members-dialog.component';
import { MemberModel } from './../../../@AppService/models/search.member.model';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';
import { ProjectService } from './../../../@AppService/services/project.service';
import { Project } from 'src/app/@AppService/models/project.model';
import { Component, HostListener } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
import { ConfirmationComponent } from 'src/app/@core/Component/confirmation/confirmation/confirmation.component';
import { confirmationType } from 'src/app/@AppService/Enums/confirmation-type';
import { ApiResponse } from 'src/app/@AppService/models/response.model';
import { of } from 'rxjs';
import { IDynamicComponent } from '../../shared/dynamic-loader/contracts/dynamic-component';
import { ProjectCharterComponent } from '../project-charter/project-charter.component';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';

@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.scss'],
})
export class ProjectProfileComponent extends BaseAddEditComponent<Project, Project> implements IDynamicComponent {

  isReadOnly: boolean;

  formGroup: FormGroup;
  private modalService: NgbModal;
  projectFiles: ProjectAttachment[] = [];
  file: File[] = [];
  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    public modal: NgbActiveModal
  ) {
    super(projectService, modal);
    this.setUserPrivilage(Pages.ProjectProfile,SystemActions.ViewProject);
    if (this.projectService.projectId > 0) {
      this.id = this.projectService.projectId; //this.baseActivatedRoute.snapshot.queryParams['id'];
    } else {
      this.id = this.readSession();
    }
    const injector = AppInjector.getInjector();
    this.modalService = injector.get(NgbModal);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
  loadForm(): void {
    //   debugger;
    this.formGroup = this.fb.group({});
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    // Your logic on beforeunload
    this.saveToSession(this.id);
  }
  prepareEntity(): void {
    const formData = this.formGroup.value;
    this.entity.id = this.id;
    this.entity.name = formData.name;
    this.entity.description = formData.description;
    this.entity.dueDate = formData.dueDate;
  }

  clearEntity(): void {
    if (this.entity == undefined || this.entity == null) return;
    this.entity.name = '';
    this.entity.userIdList = [];
  }

  emptyEntity(): Project {
    return {
      id: undefined,
      name: '',
      description: '',
      dueDate: new Date(),
      workSpaceId: 0,
      creatorUserId: 0,
      userIdList: [],
      member: '',
      members: [],
      projectAttachments: [],
      projectComments: [],
      filesCount: 0,
      activationStatus: '',
      progressPercentage: 0
    };
  }

  emptyResponseEntity(): Project {
    return {
      id: undefined,
      name: '',
      description: '',
      dueDate: new Date(),
      workSpaceId: 0,
      creatorUserId: 0,
      userIdList: [],
      member: '',
      members: [],
      projectAttachments: [],
      filesCount: 0,
      activationStatus: '',
      progressPercentage: 0
    };
  }

  openInviteMember(projectId: number, members: MemberModel[]) {
    const modalRef = this.modalService.open(InviteMembersDialogComponent, {
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.id = projectId;
    modalRef.componentInstance.members = members;
    modalRef.result.then(() => { });
  }

  projectUpdated() {
    this.ngOnInit();
  }
  handleUploadedFiles(uploadedFiles: FileContent[]) {
    this.projectService
      .addProjectFiles(this.responseEntity.id, uploadedFiles)
      .subscribe((response) => {
        if (response.isValidResponse) {
          //this.responseEntity.projectAttachments = response.result.responseData;
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
        //this.responseEntity.projectAttachments = response.result.responseData;
        this.ngOnInit();
        this.showSuccessMessage(response.result.commandMessage);
      }
    });
  }
  vieaAllFiles() {
    this.router.navigate(['/documents/view-all-files'], {
      queryParams: { projectId: this.responseEntity.id },
    });
  }

  viewProjectCharter(projectId: number) {
    const modalRef = this.modalService.open(ProjectCharterComponent, {
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.projectId = projectId;
    modalRef.result.then(() => { });
  }
}
