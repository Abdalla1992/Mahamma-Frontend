import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DashboardUrls, TaskUrls } from '../../Common/ServiceUrls';
import { ApiResponse } from '../../models/response.model';
import { TaskResponse } from '../../models/task/task.response.model';
import { BaseService } from '../Base/base.service';
import { GenericService } from '../Base/GenericService';
import { TaskRequest } from '../../models/task/task.request.model';
import { DashboardModel, DashboardStatisticsResponse } from '../../models/dashboard/dashboard.statistics.response';
import { DashboardStatisticsRequest } from '../../models/dashboard/dashboard.statistics.request';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService<TaskRequest,TaskResponse> implements OnDestroy{

  constructor(
    @Inject(HttpClient) http,
    private genericService: GenericService
  ) {
    super(http);

    this.Urls.GetProjectStatistics =
      environment.mahammaApiBaseUrl + DashboardUrls.GetProjectStatistics;
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  getProjectStatistics(request: DashboardStatisticsRequest): Observable<ApiResponse<DashboardModel>> {
    var response = this.genericService.post<ApiResponse<DashboardModel>>(
      this.Urls.GetProjectStatistics, request)
      return response;
  }
}
