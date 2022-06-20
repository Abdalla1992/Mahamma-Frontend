import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';

@Component({
  selector: 'app-update-progress-percentage',
  templateUrl: './update-progress-percentage.component.html',
  styleUrls: ['./update-progress-percentage.component.scss']
})
export class UpdateProgressPercentageComponent extends BaseComponent implements OnInit {
  @Input() taskId: number;
  @Input() progressPercentage: number;
  @Output() progressPercentageUpdatedOutput = new EventEmitter<boolean>();
  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
    public modal: NgbActiveModal,
    private taskService: TaskService) {
    super();
  }

  ngOnInit(): void {
    this.loadForm();
  }
  loadForm(): void {
    this.formGroup = this.fb.group({
      progressPercentage: [
        this.progressPercentage,
        Validators.compose([Validators.required]),
      ],
    });
  }
  save() {
    const formData = this.formGroup.value;
    let newProgressPercentage: number;
    newProgressPercentage = formData.progressPercentage;
    this.taskService.updateProgressPercentage({ taskId: this.taskId, progressPercentage: newProgressPercentage }).subscribe(response => {
      if (response.isValidResponse) {
        if (response.result.responseData) {
          this.showSuccessMessage(response.result.commandMessage);
          this.modal.close();
          this.progressPercentageUpdatedOutput.emit(true);
        } else {
          this.showErrorMessage(response.result.commandMessage);
        }
      } else {
        this.showErrorMessages(response.errors);
      }
    })
  }
}
