import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ProjectAttachmentUrls, WorkspaceUrls } from '../Common/ServiceUrls';
import { SearchModel } from '../models/common/search.model';
import { FolderRenameRequest } from '../models/folder/folder-rename-request-model';
import { FolderResponse } from '../models/folder/folder-response-model';
import { MoveFileRequest } from '../models/folder/move-file-request-model';
import { ProjectAttachment } from '../models/project.attachment.model';
import { ApiResponse, TableResponseModel } from '../models/response.model';
import { BaseService } from './Base/base.service';
import { GenericService } from './Base/GenericService';

@Injectable({
  providedIn: 'root',
})
export class ProjectAttachmentService
  extends BaseService<ProjectAttachment, ProjectAttachment>
  implements OnDestroy {
    constructor(
        @Inject(HttpClient) http,
        private genericService: GenericService
      ) {
        super(http);

        this.Urls.ListUrl = environment.mahammaApiBaseUrl + ProjectAttachmentUrls.ListProjectAttachment;
        this.Urls.AddFolder = environment.mahammaApiBaseUrl + ProjectAttachmentUrls.AddFolder;
        this.Urls.ListFolders = environment.mahammaApiBaseUrl + ProjectAttachmentUrls.ListFolders;
        this.Urls.RenameFolder = environment.mahammaApiBaseUrl + ProjectAttachmentUrls.RenameFolder;
        this.Urls.GetFolder = environment.mahammaApiBaseUrl + ProjectAttachmentUrls.GetFolder;
        this.Urls.MoveFile = environment.mahammaApiBaseUrl + ProjectAttachmentUrls.MoveFile;
        this.Urls.DeleteFolder = environment.mahammaApiBaseUrl + ProjectAttachmentUrls.DeleteFolder;
      }
      ngOnDestroy() {
        this.subscriptions.forEach((sb) => sb.unsubscribe());
      }

      addFolders(name:string , projectId:number, taskId?:number) : Observable<ApiResponse<number>>{
        return this.genericService.post<ApiResponse<number>>(this.Urls.AddFolder,
          {name:name,projectId:projectId,taskId:taskId})
      }

      getAllFolders(searchModel: SearchModel): Observable<TableResponseModel<FolderResponse>> {
        return this.genericService.post<TableResponseModel<FolderResponse>>(this.Urls.ListFolders,searchModel)
        .pipe(
          map((response: any) => {
           const result : TableResponseModel<FolderResponse> ={
            items: response.dataList,
            total: response.totalCount,
           }
            return result;
          }),
        );
      }
      
      getFolder(folderId : number): Observable<ApiResponse<FolderResponse>> {
        var response = this.genericService.get<ApiResponse<FolderResponse>>(this.Urls.GetFolder+"?id="+folderId);
        return response;
      }

      renameFolder(folderId : number, name : string): Observable<ApiResponse<boolean>> {
        let requesBody : FolderRenameRequest = { id : folderId, name : name };
        var response = this.genericService.putData<ApiResponse<boolean>>(this.Urls.RenameFolder, requesBody);
        return response;
      }

      moveFile(projectAttachmentId : number, newFolderId : number, oldFolderId? : number): Observable<ApiResponse<boolean>> {
        let requesBody : MoveFileRequest = { projectFileId : projectAttachmentId, newFolderId : newFolderId, oldFolderId : oldFolderId };
        var response = this.genericService.putData<ApiResponse<boolean>>(this.Urls.MoveFile, requesBody);
        return response;
      }

      deleteFolder(projectAttachmentId : number): Observable<ApiResponse<boolean>> {
        var response = this.genericService.deleteData<ApiResponse<boolean>>(this.Urls.DeleteFolder+'?id='+projectAttachmentId);
        return response;
      }
  }
