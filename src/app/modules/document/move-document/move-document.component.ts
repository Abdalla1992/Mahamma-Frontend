import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FolderResponse } from 'src/app/@AppService/models/folder/folder-response-model';
import { ProjectAttachment } from 'src/app/@AppService/models/project.attachment.model';
import { ProjectAttachmentService } from 'src/app/@AppService/services/project-attachment.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';

@Component({
  selector: 'app-move-document',
  templateUrl: './move-document.component.html',
  styleUrls: ['./move-document.component.scss']
})
export class MoveDocumentComponent extends BaseAddEditComponent<ProjectAttachment, ProjectAttachment> implements OnInit {

  @Input() oldFolderIdInput: number;
  @Output() newFolderIdOutput = new EventEmitter<number>();
  searchModel: any;
  folderResponse : FolderResponse[] = [];
  newFolderId : number;
  @Output () folderNameOutput = new EventEmitter<string>();

  formGroup: FormGroup;

  constructor(private fb: FormBuilder, public projectAttachmentService: ProjectAttachmentService, public modal: NgbActiveModal) {
    super(projectAttachmentService, modal);
  }

  ngOnInit(): void {
    this.loadForm();

    const filter = {};
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 1000000, total: 1000000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };

    this.projectAttachmentService.getAllFolders(this.searchModel).subscribe(response => {
      if(response){
        this.folderResponse = response.items;
       }
      });
  }

  override save(): void {
    const formData = this.formGroup.value;
    this.folderNameOutput.emit(formData.folderName)
    this.newFolderIdOutput.emit(this.newFolderId);
    this.modal.close();
  }
  loadForm(): void {
    this.formGroup = this.fb.group({
      newFolderId: [
        this.oldFolderIdInput,
        Validators.compose([Validators.required]),
      ],
      folderName:[
        //this.folderNameOutput,
        // Validators.compose([Validators.required])
      ]
    });
  }

  prepareEntity(): void {
  }

  clearEntity(): void {
  }

  emptyEntity(): ProjectAttachment {
    throw new Error('Method not implemented.');
  }

  emptyResponseEntity(): ProjectAttachment {
    throw new Error('Method not implemented.');
  }

  onSelect(newFolderId : number){
    this.newFolderId = newFolderId;
  }

}
