import { catchError, map } from 'rxjs/operators';
import { FolderResponse } from './../../../@AppService/models/folder/folder-response-model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { confirmationType } from 'src/app/@AppService/Enums/confirmation-type';
import { FileContent } from 'src/app/@AppService/models/file-content.model';
import { ProjectTaskSubtaskNames } from 'src/app/@AppService/models/project-task-subtask-names.model';
import { ProjectAttachment } from 'src/app/@AppService/models/project.attachment.model';
import { ProjectAttachmentService } from 'src/app/@AppService/services/project-attachment.service';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { ConfirmationComponent } from 'src/app/@core/Component/confirmation/confirmation/confirmation.component';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { DocumentNameComponent } from '../document-name/document-name.component';
import { ApiResponse } from 'src/app/@AppService/models/response.model';
import { of } from 'rxjs';
import { MatMenuTrigger} from '@angular/material/menu';
import { MoveDocumentComponent } from '../move-document/move-document.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-document',
  templateUrl: './view.documents.component.html',
  styleUrls: ['./view.documents.component.scss'],
})

export class ViewDocumentComponent
  extends BaseListComponent<ProjectAttachment, ProjectAttachment>
  implements OnInit {
  filterGroup: FormGroup;
  projectTaskSubtaskNames: ProjectTaskSubtaskNames;
  @Input() projectId: number;
  @Input() taskId?: number;
  @Input() folderId?: number;
  
  folderName: string;
  public modal: NgbActiveModal;


  folderResponse : FolderResponse[] = [];

  constructor(
    public projectAttachmentService: ProjectAttachmentService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {
    super(projectAttachmentService);
    this.projectId = this.baseActivatedRoute.snapshot.queryParams['projectId'];
    this.taskId = this.baseActivatedRoute.snapshot.queryParams['taskId'];
    this.folderId = this.baseActivatedRoute.snapshot.queryParams['folderId'];

    const filter = {};
    filter['projectId'] = this.projectId;
    filter['taskId'] = this.taskId;
    filter['folderId'] = this.folderId;
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 1000000, total: 1000000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };

  }

  ngOnInit() {
    super.ngOnInit();
    this.projectService
      .getProjectTaskSubtaskName(this.projectId, this.taskId)
      .subscribe((result) => {
        if (result.isValidResponse)
          this.projectTaskSubtaskNames = result.result.responseData;
      });
  }

  filterForm() {
    this.filterGroup = this.fb.group({
      fileName: [''],
      // folderName:['']
    });
    this.subscriptions.push(
      this.filterGroup.controls.fileName.valueChanges.subscribe(() => this.filter()),

    );
  }

  filter() {
    const filter = {};
    filter['projectId'] = this.projectId;
    filter['taskId'] = this.taskId;
    filter['folderId'] = this.folderId;
    const fileName = this.filterGroup.controls['fileName'].value;
    if (fileName) {
      filter['fileName'] = fileName;
    }
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 1000000, total: 1000000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.projectAttachmentService.fetch(this.searchModel);

    if(!this.folderId) {
      this.projectAttachmentService.getAllFolders(this.searchModel).subscribe(response => {
      if(response){
        this.folderResponse = response.items;
       }
      });
    }
    else{
      this.projectAttachmentService.getFolder(this.folderId).subscribe(response => {
        if(response){
          this.folderName = response.result.responseData.name;
         }
        });
    }
  }

  handleUploadedFiles(uploadedFiles: FileContent[]) {
    this.projectService
      .addProjectFiles(this.projectId, uploadedFiles, this.taskId, this.folderId)
      .subscribe((response) => {
        if (response.isValidResponse) {
          // this.responseEntity.projectAttachments = response.result.responseData;
          this.projectAttachmentService.fetch(this.searchModel);
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
        this.showSuccessMessage(response.result.commandMessage);
        this.projectAttachmentService.fetch(this.searchModel);
      }
    });
  }

  navigateToProjectFiles(projectId: any) {
    this.router.navigate(['/documents/view-all-files'], {
      queryParams: { projectId: this.projectId },
    });
  }

  navigateToTask(taskId: any) {
    this.taskService.taskId = taskId;
    this.navigateToUrl('/task/');
  }

  renameFolder(folderId : number, folderName : string){
    this.OpenPopUp(DocumentNameComponent, { modalDialogClass: '' }, [['id', folderId],['folderNameInput', folderName]],
    [
      ['folderNameOutput', (newFolderName : string) => {
        this.projectAttachmentService.renameFolder(folderId, newFolderName).subscribe(m => {this.ngOnInit()});
      }]
    ]);
  }

  deleteFolder(id: number) {
    const modalRef = this.modalService.open(ConfirmationComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.componentType = confirmationType.Delete;
    modalRef.result.then(
      (response) => {
        this.deleteFolderRecord(id);
      },
      () => {}
    );
  }

  deleteFolderRecord(id) {
    this.projectAttachmentService
      .deleteFolder(id)
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

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent, attachmentId: number) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { attachmentId: attachmentId };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  moveFile(attachmentId : number){
    this.OpenPopUp(MoveDocumentComponent, { modalDialogClass: '' }, [['id', attachmentId], ['oldFolderIdInput', this.folderId]],
    [
      ['newFolderIdOutput', (newFolderId : number) => {
        debugger;
        this.projectAttachmentService.moveFile(attachmentId, newFolderId, this.folderId).subscribe(m => {this.ngOnInit()});
      }]
    ]);
  }

  openFolder(folderId) {
    this.router.navigate(
      ['/documents/view-folder-files'],
      { queryParams: { folderId: folderId },
        queryParamsHandling: 'merge'
      }
      );
  }

  CreateFolder(){
    this.OpenPopUp(DocumentNameComponent,{modalDialogclass: ''},[],
    [
      ['folderNameOutput',(name:string) => {
        this.projectAttachmentService.addFolders(name,this.projectId,this.taskId).subscribe(response => {
          if(response.isValidResponse){
            if(response.result.responseData){
              this.ngOnInit();
              this.showSuccessMessage(response.result.commandMessage);
              this.modal.close();
            }else{
              this.showErrorMessage(response.result.commandMessage)
            }
          }
          else{
            this.showErrorMessages(response.errors)
          }
        })
      }]
    ])
  }
}

