import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MeetingUrls } from '../../Common/ServiceUrls';
import { BaseService } from '../Base/base.service';
import { GenericService } from '../Base/GenericService';
import { MeetingResponse } from '../../models/meeting/meeting-response.model';
import { MeetingRequest } from '../../models/meeting/meeting-request.model';
import { Observable, Subject } from 'rxjs';
import { ApiResponse } from '../../models/response.model';
import { MinuteOfMeetingResponse } from '../../models/meeting/minute-of-meeting-response.model';
import { MinuteOfMeetingRequest } from '../../models/meeting/minute-of-meeting-request.model';
import { MinuteOfMeetingActionResponse } from '../../models/meeting/minute-of-meeting-action-response.model';
import { MinuteOfMeetingUpdateRequest } from '../../models/meeting/minute-of-meeting-update-request.model';
import { MinuteOfMeetingPublishRequest } from '../../models/meeting/minute-of-meeting-publish-request.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingService extends BaseService<MeetingRequest, MeetingResponse> implements OnDestroy {

  constructor(
    @Inject(HttpClient) http,
    private genericService: GenericService
  ) {
    super(http);

    this.Urls.ListUrl = environment.mahammaApiBaseUrl + MeetingUrls.ListMeeting;
    this.Urls.GetByIdUrl =  environment.mahammaApiBaseUrl + MeetingUrls.GetMeetingById;
    this.Urls.CreateUrl = environment.mahammaApiBaseUrl + MeetingUrls.CreateMeeting;
    this.Urls.UpdateUrl = environment.mahammaApiBaseUrl + MeetingUrls.UpdateMeeting;
    this.Urls.DeleteUrl = environment.mahammaApiBaseUrl + MeetingUrls.CancelMeeting;
    this.Urls.ListMinuteOfMeeting = environment.mahammaApiBaseUrl + MeetingUrls.ListMinuteOfMeeting;
    this.Urls.CreateMinuteOfMeeting = environment.mahammaApiBaseUrl + MeetingUrls.CreateMinuteOfMeeting;
    this.Urls.UpdateMinuteOfMeeting = environment.mahammaApiBaseUrl + MeetingUrls.UpdateMinuteOfMeeting;
    this.Urls.DeleteMinuteOfMeeting = environment.mahammaApiBaseUrl + MeetingUrls.DeleteMinuteOfMeeting;
    this.Urls.PublishAllMinutesOfMeeting = environment.mahammaApiBaseUrl + MeetingUrls.PublishAllMinutesOfMeeting;
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  minuteOfMeetingRefresher = new Subject();
  minuteOfMeetingObserver = this.minuteOfMeetingRefresher.asObservable();

  refresherMinuteOfMeeting(){
    this.minuteOfMeetingRefresher.next();
  }

  getMinutesMeeting(meetingId: number): Observable<ApiResponse<MinuteOfMeetingActionResponse[]>> {  
    var response = this.genericService.get<ApiResponse<MinuteOfMeetingActionResponse[]>>(
      this.Urls.ListMinuteOfMeeting + '?id=' + meetingId);
    return response;
  }

  addMinuteMeeting(minuteMeeting: MinuteOfMeetingRequest): Observable<ApiResponse<boolean>>  {
    return this.genericService.post<ApiResponse<boolean>>(this.Urls.CreateMinuteOfMeeting ,minuteMeeting);
  }
  
  updateMinuteMeeting(minuteMeeting: MinuteOfMeetingUpdateRequest): Observable<ApiResponse<boolean>>  {
    return this.genericService.post<ApiResponse<boolean>>(this.Urls.UpdateMinuteOfMeeting ,minuteMeeting);
  }

  deleteMinuteMeeting(minuteMeetingId: number, meetingId): Observable<ApiResponse<boolean>>  {
    return this.genericService.deleteData<ApiResponse<boolean>>(this.Urls.DeleteMinuteOfMeeting + "?id=" + minuteMeetingId + "&meetingId=" + meetingId);
  }

  publishMinutesOfMeeting(minutesOfMeetingPublishModel : MinuteOfMeetingPublishRequest): Observable<ApiResponse<boolean>>  {
    return this.genericService.post<ApiResponse<boolean>>(this.Urls.PublishAllMinutesOfMeeting, minutesOfMeetingPublishModel);
  }
}
