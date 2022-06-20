import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskMemberModel } from 'src/app/@AppService/models/task/task.member.model';
import { TaskRequest } from 'src/app/@AppService/models/task/task.request.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';

@Component({
  selector: 'app-review-sub-task',
  templateUrl: './review-sub-task.component.html',
  styleUrls: ['./review-sub-task.component.scss']
})
export class ReviewSubTaskComponent extends BaseAddEditComponent<TaskRequest, TaskResponse> implements OnInit {

  @Input() id: number;
  @Input() members: TaskMemberModel[];
  formGroup: FormGroup;
  taskRate: number = 0;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    public modal: NgbActiveModal) {
    super(taskService, modal);
  }

  ngOnInit(): void {
    this.loadForm();
  }

  prepareEntity(): void {
    throw new Error('Method not implemented.');
  }
  clearEntity(): void {
    throw new Error('Method not implemented.');
  }
  emptyEntity(): TaskRequest {
    throw new Error('Method not implemented.');
  }
  emptyResponseEntity(): TaskResponse {
    throw new Error('Method not implemented.');
  }

  loadForm(): void {
    this.formGroup = this.fb.group({
      description: [
        '',
        Validators.compose([Validators.required, Validators.min(1)]),
      ]
    });
  }

  submit(isAccpeted: boolean) {
    if (this.formGroup.valid) {
      this.taskService.reviewTask(this.id, this.members, isAccpeted, this.formGroup.value.description).subscribe(result => {
        if (result.isValidResponse) {
          this.modal.close();
          if (result.result.responseData) {
            this.showSuccessMessage(result.result.commandMessage);
            this.entityUpdatedOutput.emit(true);
          } else {
            this.showErrorMessage(result.result.commandMessage);
          }
        } else {
          this.showErrorMessages(result.errors);
        }
      });
    }
  }
}


