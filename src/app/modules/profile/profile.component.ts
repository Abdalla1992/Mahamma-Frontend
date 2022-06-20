import {
  UserTasks,
  UserTaskesRejection,
} from './../../@AppService/models/user-profile-task-history.model';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { UserProfileTaskHistory } from 'src/app/@AppService/models/user-profile-task-history.model';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { UserService } from 'src/app/@AppService/services/user.service';
import { User } from 'src/app/@core/auth/app-user';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { DatePipe } from '@angular/common';
import { TaskStatus } from 'src/app/@AppService/Enums/task.status';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends BaseComponent implements OnInit {
  userId: number;
  user: User;
  skills: string[];
  userProfileTaskHistory: UserProfileTaskHistory;
  currentRate = 0;
  userTaskesRejected: UserTaskesRejection[];
  public get TaskStatus(): typeof TaskStatus {
    return TaskStatus;
  }

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private taskService: TaskService,
    public datepipe: DatePipe
  ) {
    super();
    this.userId =
      this.userId ||
      Number(JSON.parse(this.route.snapshot.paramMap.get('id') || '0'));
    if (this.userId <= 0) {
      if (this.userService.userProfileId > 0) {
        this.userId = this.userService.userProfileId;
      } else {
        this.userId = this.readSession();
      }
    }
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe((response) => {
      if (response.isValidResponse) {
        this.user = response.result.responseData;
        if (this.user) {
          if (this.user.skills) this.skills = this.user.skills.split(',');
          else this.skills = [];
        }
      } else {
        this.showErrorMessages(response.errors);
      }
    });
    this.taskService.getUserTasks(this.userId).subscribe((response) => {
      debugger;
      if (response.isValidResponse) {
        this.userProfileTaskHistory = response.result.responseData;
        if (this.userProfileTaskHistory) {
        }
      } else {
        this.showErrorMessages(response.errors);
      }
    });

    this.taskService.getUserTasksRejected(this.userId).subscribe((response) => {
      if (response.isValidResponse) {
        debugger;
        this.userTaskesRejected = response.result.responseData;
      } else {
        this.showErrorMessages(response.errors);
      }
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    // Your logic on beforeunload
    this.saveToSession(this.userId);
  }
}
