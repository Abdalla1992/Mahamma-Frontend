import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskActivityModel } from 'src/app/@AppService/models/task/task.activity.model';
import { TaskRequest } from 'src/app/@AppService/models/task/task.request.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';

@Component({
  selector: 'app-sub-task-activities',
  templateUrl: './sub-task-activities.component.html',
  styleUrls: ['./sub-task-activities.component.scss']
})
export class SubTaskActivitiesComponent extends BaseAddEditComponent<TaskRequest, TaskResponse> implements OnInit {
  loadForm(): void {
    throw new Error('Method not implemented.');
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

  @Input() taskId: number; 
  taskActivity : TaskActivityModel[]; 

  constructor(private taskService: TaskService,
    public modal: NgbActiveModal,
    ) 
  {
    super(taskService, modal);
  }

  ngOnInit(): void {
    this.taskService.GetTaskActivites(this.taskId).subscribe(task => 
    {
      this.taskActivity = task.result.responseData;
    });
  }

}
