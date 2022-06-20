import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskRequest } from 'src/app/@AppService/models/task/task.request.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';

@Component({
  selector: 'app-submit-task',
  templateUrl: './submit-task.component.html',
  styleUrls: ['./submit-task.component.scss']
})
export class SubmitTaskComponent extends BaseAddEditComponent<TaskRequest, TaskResponse> implements OnInit{

    formGroup: FormGroup;
    @Input() taskId: number;

    constructor(
      private fb: FormBuilder,
      private taskService: TaskService,
      public modal: NgbActiveModal) 
    {
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
        durationInHours: [
          '',
          Validators.compose([Validators.required, Validators.min(1)]),
        ],
      });
    }

    submit() {
      if(this.formGroup.valid){
        this.taskService.submitTask(this.taskId, this.formGroup.value.durationInHours).subscribe( result => 
          {
            this.modal.close();
            this.entityUpdatedOutput.emit(true);
          });
      }
    }
}


