import { SearchModel } from './../models/common/search.model';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WorkspaceUrls } from '../Common/ServiceUrls';
import { ApiResponse, TableResponseModel } from '../models/response.model';
import { Workspace } from '../models/workspace.model';
import { BaseService } from './Base/base.service';
import { GenericService } from './Base/GenericService';

@Injectable({
  providedIn: 'root',
})

export class WorkspaceService
  extends BaseService<Workspace, Workspace>
  implements OnDestroy {

  workspaceEmmiter: EventEmitter<number> = new EventEmitter();
  workspaceId: number;
  removeWSMemberUrl: string;
  constructor(
    @Inject(HttpClient) http,
    private genericService: GenericService
  ) {
    super(http);

    this.Urls.ListUrl =
      environment.mahammaApiBaseUrl + WorkspaceUrls.ListWorkspace;
    this.Urls.GetByIdUrl =
      environment.mahammaApiBaseUrl + WorkspaceUrls.GetWorkspaceById;
    this.Urls.CreateUrl =
      environment.mahammaApiBaseUrl + WorkspaceUrls.CreateWorkspace;
    this.Urls.UpdateUrl =
      environment.mahammaApiBaseUrl + WorkspaceUrls.UpdateWorkspace;
    this.Urls.DeleteUrl =
      environment.mahammaApiBaseUrl + WorkspaceUrls.DeleteWorkspace;
    this.removeWSMemberUrl = environment.mahammaApiBaseUrl + WorkspaceUrls.RemoveWSMember;
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  getWorkspace(id: number): Observable<ApiResponse<Workspace>> {
    return this.genericService.get<ApiResponse<Workspace>>(this.Urls.GetByIdUrl + '?id=' + id);
  }

  updateWorkspace(workspace: Workspace): Observable<ApiResponse<boolean>> {
    return this.genericService.putData<ApiResponse<boolean>>(this.Urls.UpdateUrl, workspace);
  }

  getWorkspaceList(searchModel: SearchModel): Observable<TableResponseModel<Workspace>> {
    return this.genericService.post<TableResponseModel<Workspace>>(this.Urls.ListUrl, searchModel)
      .pipe(
        map((response: any) => {
          const result: TableResponseModel<Workspace> = {
            items: response.dataList,
            total: response.totalCount,
          };
          return result;
        }),
        // catchError((err) => {
        //   this._errorMessage.next(err);
        //   console.error('FIND ITEMS', err);
        //   return of({ items: [], total: 0 });
        // })
      );
  }

  removeWSMember(userId: number, workspaceId: number): Observable<ApiResponse<boolean>> {
    debugger;
    return this.http.delete<ApiResponse<boolean>>(
      this.removeWSMemberUrl + '?userId=' + userId + '&workspaceId=' + workspaceId
    );
  }
}
