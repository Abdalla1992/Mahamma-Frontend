import { Component, OnInit } from '@angular/core';
import { UserTasksInfo } from 'src/app/@AppService/models/my-work/user-tasks-info.model';
import { MyWorkService } from 'src/app/@AppService/services/my-work.service';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';

@Component({
  selector: 'app-my-work-notes',
  templateUrl: './my-work-notes.component.html'
})
export class MyWorkNotesComponent extends BaseComponent implements OnInit {
  userTasksInfo = {} as UserTasksInfo;

  constructor(private myWorkService: MyWorkService) { super(); }

  ngOnInit(): void {
    this.getUserTasksInfo();
  }

  getUserTasksInfo() {
    this.myWorkService.getUserTasksInfo().subscribe(
      res => this.userTasksInfo = res.result.responseData,
      err => this.showErrorMessages(err.error.errors)
    )
  }

  
}