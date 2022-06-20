import { NotificationSchedule } from './../../models/notifications/notification-schedule';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BaseService } from '../Base/base.service';
import { GenericService } from '../Base/GenericService';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NotificationUrls } from '../../Common/ServiceUrls';
import { Observable, of } from 'rxjs';
import { ApiResponse } from '../../models/response.model';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationScheduleServiceService
  extends BaseService<NotificationSchedule, NotificationSchedule>
  implements OnDestroy
{
  constructor(
    @Inject(HttpClient) http,
    private genericService: GenericService
  ) {
    super(http);

    this.Urls.GetUserNotificationSchedule =
      environment.mahammaNotificationBaseUrl +
      NotificationUrls.GetUserNotificationSchedule;
    this.Urls.CreateUrl =
      environment.mahammaNotificationBaseUrl +
      NotificationUrls.AddNotificationSchedule;
    this.Urls.UpdateUrl =
      environment.mahammaNotificationBaseUrl +
      NotificationUrls.UpdateNotificationSchedule;
    this.Urls.DeleteNotificationScheduleUrl =
      environment.mahammaNotificationBaseUrl +
      NotificationUrls.DeleteNotificationSchedule;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  GetUserNotificationSchedule(
    userId: number
  ): Observable<ApiResponse<NotificationSchedule>> {
    return this.genericService.get<ApiResponse<NotificationSchedule>>(
      this.Urls.GetUserNotificationSchedule + '?userId=' + userId
    );
  }

  deleteNotificationSchedule(id: number): Observable<ApiResponse<Boolean>> {
    return this.http.delete<ApiResponse<Boolean>>(
      this.Urls.DeleteNotificationScheduleUrl + '?id=' + id
    );
  }
}
