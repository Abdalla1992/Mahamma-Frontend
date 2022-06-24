import {
  UserTasks,
  UserTaskesRejection,
} from './../../@AppService/models/user-profile-task-history.model';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { UserProfileTaskHistory } from 'src/app/@AppService/models/user-profile-task-history.model';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { UserService } from 'src/app/@AppService/services/user.service';
import { User, UserProfileSectionDto } from 'src/app/@core/auth/app-user';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { DatePipe } from '@angular/common';
import { TaskStatus } from 'src/app/@AppService/Enums/task.status';
import { ActivatedRoute } from '@angular/router';
import { userProfileSectionEnum } from 'src/app/@AppService/Enums/userProfileSection';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent extends BaseComponent implements OnInit {
  userId: number;
  user: User;
  skills: string[];
  sectionOrder:UserProfileSectionDto[]=defaultSectionOrder;
  userProfileTaskHistory: UserProfileTaskHistory;
  currentRate = 0;
  userTaskesRejected: UserTaskesRejection[];
  public get TaskStatus(): typeof TaskStatus {
    return TaskStatus;
  }

  public get profileSectionEnum(){
    return userProfileSectionEnum;
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

          if(this.user.userProfileSections != undefined &&this.user.userProfileSections.length>0)
          {
            this.sectionOrder = this.user.userProfileSections;
          }
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

  changeOrder(item :UserProfileSectionDto,moveUp:boolean)
  {
debugger;
    if(moveUp)
    {
      let downIndx = this.sectionOrder.findIndex(obj => obj.orderId == (item.orderId-1));
      this.sectionOrder[downIndx].orderId=item.orderId

     let upIndx = this.sectionOrder.findIndex(obj => obj.sectionId == item.sectionId);
      this.sectionOrder[upIndx].orderId=item.orderId-1

    }else{
      let upIndx = this.sectionOrder.findIndex(obj => obj.orderId == (item.orderId+1));
      this.sectionOrder[upIndx].orderId=item.orderId

     let downIndx = this.sectionOrder.findIndex(obj => obj.sectionId == item.sectionId);
      this.sectionOrder[downIndx].orderId=item.orderId+1
    }

    //call BE
   this.updateSectionOrder();
  }
  updateSectionOrder() {
    this.userService
      .updateUserProfileSection(this.userId,this.sectionOrder)
      .subscribe((response) => {
        if (response.isValidResponse) {
          if (response.result.responseData) {
            this.showSuccessMessage(response.result.commandMessage);
           this.ngOnInit();
          } else {
            this.showErrorMessage(response.result.commandMessage);
          }
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


const defaultSectionOrder:UserProfileSectionDto[]=[
  {sectionId:userProfileSectionEnum.Tasks , orderId:1},
  {sectionId:userProfileSectionEnum.Bio , orderId:2},
  {sectionId:userProfileSectionEnum.WorkHistory , orderId:3},
  {sectionId:userProfileSectionEnum.RejectedTask , orderId:4},


]