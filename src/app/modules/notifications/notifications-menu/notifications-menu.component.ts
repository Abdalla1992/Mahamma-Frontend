import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotificationContent } from 'src/app/@AppService/models/notifications/notification-content';
import { NotificationService } from 'src/app/@AppService/services/notification/notification.service';
import { SignalRService } from 'src/app/@AppService/services/signalR/signal-r.service';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';

@Component({
  selector: 'app-notifications-menu',
  templateUrl: './notifications-menu.component.html',
  styleUrls: ['./notifications-menu.component.scss']
})
export class NotificationsMenuComponent extends BaseListComponent<NotificationContent, NotificationContent[]> implements OnInit {

  @Output() seleteNotification = new EventEmitter<NotificationContent>();
  notificationList : NotificationContent[] = [];

  constructor(private notificationService : NotificationService, 
    private authenticationService : AuthenticationService,
    private signalRService : SignalRService) 
    {
      super(notificationService);
      this.signalRService.information.subscribe(message => {
        this.ngOnInit();
      });
    }

  ngOnInit(): void {
      this.notificationService.getNotifications().subscribe(response =>
      {
        this.notificationList = response.result.responseData.filter(n => n.languageId == this.authenticationService.currentUser().languageId)
        this.notificationService.allNotificationsSeen().subscribe(n => {});
        this.notificationService.refreshNorificationsCount(0);
      });
    }

    filterForm(): void {
    }
    filter(): void {
    }

    notificationClick(notification: NotificationContent){
      this.seleteNotification.emit(notification);
    }
}
