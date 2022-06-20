import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationUrls, TaskUrls } from '../../Common/ServiceUrls';
import { ApiResponse } from '../../models/response.model';
import { TaskResponse } from '../../models/task/task.response.model';
import { TaskActivityModel } from '../../models/task/task.activity.model';
import { BaseService } from '../Base/base.service';
import { GenericService } from '../Base/GenericService';
import { TaskRequest } from '../../models/task/task.request.model';
import { ProjectAttachment } from '../../models/project.attachment.model';
import { TaskCommentRequest } from '../../models/task/task.comments.request';
import { NotificationContent } from '../../models/notifications/notification-content';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService<NotificationContent, NotificationContent[]> implements OnDestroy {

  constructor(
    @Inject(HttpClient) http,
    private genericService: GenericService
  ) {
    super(http);

    this.Urls.GetNotificationsCount = environment.mahammaNotificationBaseUrl + NotificationUrls.GetNotificationsCount;
    this.Urls.GetNotifications = environment.mahammaNotificationBaseUrl + NotificationUrls.GetAllNotifications;
    this.Urls.AllNotificationsSeen = environment.mahammaNotificationBaseUrl + NotificationUrls.AllNotificationsSeen;
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  norificationsCountRefresher = new Subject<number>();
  norificationsCountObserver = this.norificationsCountRefresher.asObservable();

  refreshNorificationsCount(count: number){
    this.norificationsCountRefresher.next(count);
  }

  getNotifications(): Observable<ApiResponse<NotificationContent[]>> {
    return this.genericService.get<ApiResponse<NotificationContent[]>>(this.Urls.GetNotifications);
  }

  getNotificationsCount(): Observable<ApiResponse<number>> {
    return this.genericService.get<ApiResponse<number>>(this.Urls.GetNotificationsCount);
  }

  allNotificationsSeen(): Observable<ApiResponse<boolean>> {
    return this.genericService.get<ApiResponse<boolean>>(this.Urls.AllNotificationsSeen);
  }
}
