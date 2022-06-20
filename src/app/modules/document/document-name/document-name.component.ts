import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectAttachment } from 'src/app/@AppService/models/project.attachment.model';
import { ProjectAttachmentService } from 'src/app/@AppService/services/project-attachment.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';

@Component({
  selector: 'app-document-name',
  templateUrl: './document-name.component.html',
  styleUrls: ['./document-name.component.scss']
})
export class DocumentNameComponent extends BaseAddEditComponent<ProjectAttachment, ProjectAttachment> implements OnInit {

  @Input() folderNameInput: string;
  @Output() folderNameOutput = new EventEmitter<string>();
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, public projectAttachmentService: ProjectAttachmentService, public modal: NgbActiveModal) {
    super(projectAttachmentService, modal);
  }

  ngOnInit(): void {
    this.loadForm();
  }

  override save(): void {
    const formData = this.formGroup.value;
    this.folderNameOutput.emit(formData.folderName);
    this.modal.close();
  }

  loadForm(): void {
    this.formGroup = this.fb.group({
      folderName: [
        this.folderNameInput,
        Validators.compose([Validators.required]),
      ],
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

}
