import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';
import { MeetingRequest } from 'src/app/@AppService/models/meeting/meeting-request.model';
import { MeetingResponse } from 'src/app/@AppService/models/meeting/meeting-response.model';
import { MeetingService } from 'src/app/@AppService/services/meeting/meeting.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';

@Component({
  selector: 'app-minute-of-meeting-description-profile',
  templateUrl: './minute-of-meeting-description.component.html',
  styleUrls: ['./minute-of-meeting-description.component.scss']
})
export class MinuteOfMeetingDescription  extends BaseAddEditComponent<MeetingRequest, MeetingResponse> implements OnInit {

  @Input() descriptionInput: string;
  @Output() descriptionOutput = new EventEmitter<string>();
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, public meetingService: MeetingService, public modal: NgbActiveModal) {
    super(meetingService, modal);
  }

  ngOnInit(): void {
    this.descriptionInput;
    this.loadForm();
  }

  override save(): void {
    const formData = this.formGroup.value;
    this.descriptionOutput.emit(formData.description);
    this.modal.close();
  }

  loadForm(): void {
    this.formGroup = this.fb.group({
      description: [
        this.descriptionInput,
        Validators.compose([Validators.required]),
      ],
    });
  }

  prepareEntity(): void {
  }

  clearEntity(): void {
  }

  emptyEntity(): MeetingRequest {
    throw new Error('Method not implemented.');
  }

  emptyResponseEntity(): MeetingResponse {
    throw new Error('Method not implemented.');
  }

}
