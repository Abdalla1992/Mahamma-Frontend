import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskMemberModel } from 'src/app/@AppService/models/task/task.member.model';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { TaskRequest } from 'src/app/@AppService/models/task/task.request.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';

@Component({
  selector: 'app-rate-member-task',
  templateUrl: './rate-member-task.component.html',
  styleUrls: ['./rate-member-task.component.scss'],
})
export class RateMemberTaskComponent
  extends BaseAddEditComponent<TaskRequest, TaskResponse>
  implements OnInit
{
  @Input() id: number;
  @Input() members: TaskMemberModel[];
  formGroup: FormGroup;
  taskRate: number = 0;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    public modal: NgbActiveModal
  ) {
    super(taskService, modal);
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm(): void {
    this.formGroup = this.fb.group({});
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

  // saveRate() {
  //   if (this.formGroup.valid) {
  //     this.taskService
  //       .rateMemberTask(this.id, this.members)
  //       .subscribe((result) => {
  //         if (result.isValidResponse) {
  //           this.modal.close();
  //           if (result.result.responseData) {
  //             this.showSuccessMessage(result.result.commandMessage);
  //             this.entityUpdatedOutput.emit(true);
  //           } else {
  //             this.showErrorMessage(result.result.commandMessage);
  //           }
  //         } else {
  //           // this.showErrorMessage(result.errors);
  //         }
  //       });
  //   }
  // }

  saveRate() {
    if (this.formGroup.valid) {
      this.taskService
        .rateMemberTask(this.id, this.members)
        .subscribe((result) => {
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

  cancelRate() {
    this.modal.close();
  }
}
