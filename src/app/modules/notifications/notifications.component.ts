import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationContent } from 'src/app/@AppService/models/notifications/notification-content';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  
  
  key : string = "";
  id : number = 0;
  isReadOnly: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

  loadComponent(notification: NotificationContent){
    if(notification.notification.taskId != null){
      this.key = "Task";
      this.id = notification.notification.taskId;
    }
    else if(notification.notification.projectId != null){
      this.key = "Project";
      this.id = notification.notification.projectId;
    }
    else if(notification.notification.workSpaceId != null){
      this.key = "Workspace";
      this.id = notification.notification.workSpaceId;
    }
    else if(notification.notification.meetingId != null){
      this.key = "Meeting";
      this.id = notification.notification.meetingId;
    }
  }
}
