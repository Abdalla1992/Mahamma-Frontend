import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/@core/auth/app-user';
import { SignalRService } from 'src/app/@AppService/services/signalR/signal-r.service';
import { NotificationService } from 'src/app/@AppService/services/notification/notification.service';
import { UserService } from 'src/app/@AppService/services/user.service';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent extends BaseComponent implements OnInit {
  currentUSer: User;
  notificationCount: number = 0;
  constructor(private authenticationService: AuthenticationService,
    private notificationService : NotificationService,
    private signalRService : SignalRService ,public userService: UserService) {
    super();
    notificationService.getNotificationsCount().subscribe(response => {
      this.notificationCount = response.result.responseData;
    });
    this.signalRService.information.subscribe(notificationCount => {
      this.notificationCount = notificationCount;
    });
    notificationService.norificationsCountObserver.subscribe(count => {
      this.notificationCount = count;
    });

    this.router.routeReuseStrategy.shouldReuseRoute=function(){
      return false;
    }
  }

  ngOnInit(): void {
    this.currentUSer = this.authenticationService.currentUser();
  }
  logout() {
    this.authenticationService.logout();
    this.navigateToUrl('/');
  }

  openMemberProfile(userId: number) {
    // this.userService.userProfileId = userId;
    this.navigateToUrl('profile/'+userId);
  }

}
