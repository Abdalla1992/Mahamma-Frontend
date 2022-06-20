import { ProjectLikeCommentModel } from './../models/project-comments-request';
import { FileContent } from 'src/app/@AppService/models/file-content.model';
import { ApiResponse, Result } from 'src/app/@AppService/models/response.model';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectUrls } from '../Common/ServiceUrls';
import { Project } from '../models/project.model';
import { BaseService } from './Base/base.service';
import { GenericService } from './Base/GenericService';
import { ProjectActivityModel } from '../models/project-activities.model';
import { ProjectAttachment } from '../models/project.attachment.model';
import { ProjectTaskSubtaskNames } from '../models/project-task-subtask-names.model';
import { catchError, finalize } from 'rxjs/operators';
import { ProjectCharter } from '../models/project-charter.mode';
import { ProjectRiskPlan } from '../models/project-risk-plan.model';
import { ProjectCommunicationPlan } from '../models/project-communication-plan.model';
import { ProjectCommentsRequest } from '../models/project-comments-request';
import { ProjectCommentsResponse } from '../models/project-comments-response';

@Injectable({
  providedIn: 'root',
})
export class ProjectService
  extends BaseService<Project, Project>
  implements OnDestroy {
  projectId: number;
  archiveUrl: string;
  deleteProjectFileUrl: string;
  getProjectTaskSubtaskNameUrl: string;

  getProjectCharterUrl: string;
  updateProjectCharterUrl:string;
  getAllProjectRiskPlansUrl: string;

  addProjectRiskPlanUrl: string;
  updateProjectRiskPlanUrl: string;
  deleteProjectRiskPlanUrl: string;

  getAllProjectCommunicationPlansUrl: string;
  addProjectCommunicationPlanUrl: string;
  updateProjectCommunicationPlanUrl: string;
  deleteProjectCommunicationPlanUrl: string;

  ProjectAddCommentUrl: string;
  likeCommentUrl: string;


  constructor(
    @Inject(HttpClient) http,
    private genericService: GenericService
  ) {
    super(http);

    this.Urls.ListUrl = environment.mahammaApiBaseUrl + ProjectUrls.ListProject;
    this.Urls.GetByIdUrl =
      environment.mahammaApiBaseUrl + ProjectUrls.GetProjecteById;
    this.Urls.CreateUrl =
      environment.mahammaApiBaseUrl + ProjectUrls.CreateProject;
    this.Urls.UpdateUrl =
      environment.mahammaApiBaseUrl + ProjectUrls.UpdateProject;
    this.Urls.DeleteUrl =
      environment.mahammaApiBaseUrl + ProjectUrls.DeleteProject;
    this.archiveUrl =
      environment.mahammaApiBaseUrl + ProjectUrls.ArchiveProject;
    this.deleteProjectFileUrl =
      environment.mahammaApiBaseUrl + ProjectUrls.DeleteProjectFile;
    this.getProjectTaskSubtaskNameUrl =
      environment.mahammaApiBaseUrl + ProjectUrls.GetProjectTaskSubtaskName;
    this.Urls.ArchiveUrl = environment.mahammaApiBaseUrl + ProjectUrls.ArchiveProject;
    this.getProjectCharterUrl = environment.mahammaApiBaseUrl + ProjectUrls.GetProjectCharter;
    this.updateProjectCharterUrl = environment.mahammaApiBaseUrl + ProjectUrls.UpdateProjectCharter;

    this.getAllProjectRiskPlansUrl = environment.mahammaApiBaseUrl + ProjectUrls.GetAllProjectRiskPlans;
    this.addProjectRiskPlanUrl = environment.mahammaApiBaseUrl + ProjectUrls.AddProjectRiskPlan;
    this.updateProjectRiskPlanUrl = environment.mahammaApiBaseUrl + ProjectUrls.UpdateProjectRiskPlan;
    this.deleteProjectRiskPlanUrl = environment.mahammaApiBaseUrl + ProjectUrls.DeleteProjectRiskPlan;

    this.getAllProjectCommunicationPlansUrl = environment.mahammaApiBaseUrl + ProjectUrls.GetAllProjectCommunicationPlans;
    this.addProjectCommunicationPlanUrl = environment.mahammaApiBaseUrl + ProjectUrls.AddProjectCommunicationPlan;
    this.updateProjectCommunicationPlanUrl = environment.mahammaApiBaseUrl + ProjectUrls.UpdateProjectCommunicationPlan;
    this.deleteProjectCommunicationPlanUrl = environment.mahammaApiBaseUrl + ProjectUrls.DeleteProjectCommunicationPlan;
    this.ProjectAddCommentUrl = environment.mahammaApiBaseUrl + ProjectUrls.ProjectAddComment;
    this.likeCommentUrl = environment.mahammaApiBaseUrl + ProjectUrls.ProjectLikeComment;
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  
  override getItemById(id: number, requestedFromMeeting?: boolean): Observable<any> {
    let meetingCondition = requestedFromMeeting != undefined && requestedFromMeeting ? "&requestedFromMeeting=" + requestedFromMeeting : "";
    return this.http.get<any>(this.Urls.GetByIdUrl + '?id=' + id + meetingCondition).pipe(
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('GET ITEM BY IT', id, err);
        return of({ id: undefined, activationStatus: '' });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  assignMember(
    projectId: number,
    userIdList: number[]
  ): Observable<ApiResponse<boolean>> {
    return this.genericService.post<ApiResponse<boolean>>(
      environment.mahammaApiBaseUrl + ProjectUrls.AssignMember,
      {
        projectId: projectId,
        userIdList: userIdList,
      }
    );
  }
  getProjectActivites(
    projectId: number
  ): Observable<ApiResponse<ProjectActivityModel[]>> {
    return this.genericService.get<ApiResponse<ProjectActivityModel[]>>(
      environment.mahammaApiBaseUrl +
      ProjectUrls.ProjectActivities +
      '?id=' +
      projectId
    );
  }
  // archive(id: number): Observable<ApiResponse<boolean>> {
  //   return this.http.delete<ApiResponse<boolean>>(
  //     this.archiveUrl + '?id=' + id
  //   );
  // }
  addProjectFiles(projectId: number, uploadedFiles: FileContent[], taskId?: number, folderId? : number): Observable<ApiResponse<ProjectAttachment[]>> 
  {
    return this.genericService.post<ApiResponse<ProjectAttachment[]>>(environment.mahammaApiBaseUrl + ProjectUrls.AddProjectFile,
      { projectId: projectId, taskId: taskId, uploadedFiles: uploadedFiles, folderId : folderId }
    );
  }
  deleteProjectFile(id: number): Observable<ApiResponse<ProjectAttachment[]>> {
    return this.http.delete<ApiResponse<ProjectAttachment[]>>(
      this.deleteProjectFileUrl + '?id=' + id
    );
  }
  getProjectTaskSubtaskName(
    projectId: number,
    taskId?: number
  ): Observable<ApiResponse<ProjectTaskSubtaskNames>> {
    return this.http.post<ApiResponse<ProjectTaskSubtaskNames>>(
      this.getProjectTaskSubtaskNameUrl,
      { projectId: projectId, taskId: taskId }
    );
  }

  getProjectList(): Observable<Result<Project[]>> {
    return this.http.get<Result<Project[]>>(
      environment.mahammaApiBaseUrl + "Project/GetUserProjectList");
  }

  getProjectCharter(projectId: any): Observable<ApiResponse<ProjectCharter>> {
    return this.http.get<ApiResponse<ProjectCharter>>(this.getProjectCharterUrl + '?projectid=' + projectId);
  }
  updateProjectCharter(projectCharter: ProjectCharter): Observable<ApiResponse<ProjectCharter>> {
    return this.http.post<ApiResponse<ProjectCharter>>( this.updateProjectCharterUrl, projectCharter);
  }

  getAllRiskPlans(projectId: any): Observable<ApiResponse<ProjectRiskPlan[]>>{
    return this.http.get<ApiResponse<ProjectRiskPlan[]>>(this.getAllProjectRiskPlansUrl + '?projectid=' + projectId);
  }
  addRiskPlan(projectRiskPlan: ProjectRiskPlan): Observable<ApiResponse<ProjectRiskPlan>>{
    return this.http.post<ApiResponse<ProjectRiskPlan>>( this.addProjectRiskPlanUrl, projectRiskPlan);
  }
  updateRiskPlan(projectRiskPlan: ProjectRiskPlan): Observable<ApiResponse<ProjectRiskPlan>>{
    return this.http.post<ApiResponse<ProjectRiskPlan>>( this.updateProjectRiskPlanUrl, projectRiskPlan);
  }
  deleteRiskPlan(planId: number): Observable<ApiResponse<ProjectRiskPlan>>{
    return this.http.get<ApiResponse<ProjectRiskPlan>>(this.deleteProjectRiskPlanUrl + '?planid=' + planId);
  }

  getAllCommunicationPlans(projectId: any): Observable<ApiResponse<ProjectCommunicationPlan[]>>{
    return this.http.get<ApiResponse<ProjectCommunicationPlan[]>>(this.getAllProjectCommunicationPlansUrl + '?projectid=' + projectId);
  }
  addCommunicationPlan(projectCommunicationPlan: ProjectCommunicationPlan): Observable<ApiResponse<ProjectCommunicationPlan>>{
    return this.http.post<ApiResponse<ProjectCommunicationPlan>>( this.addProjectCommunicationPlanUrl, projectCommunicationPlan);
  }
  updateCommunicationPlan(projectCommunicationPlan: ProjectCommunicationPlan): Observable<ApiResponse<ProjectCommunicationPlan>>{
    return this.http.post<ApiResponse<ProjectCommunicationPlan>>( this.updateProjectCommunicationPlanUrl, projectCommunicationPlan);
  }
  deleteCommunicationPlan(planId: number): Observable<ApiResponse<ProjectCommunicationPlan>>{
    return this.http.get<ApiResponse<ProjectCommunicationPlan>>(this.deleteProjectCommunicationPlanUrl + '?planid=' + planId);
  }

  AddComment(request: ProjectCommentsRequest): Observable<ApiResponse<ProjectCommentsResponse[]>> {
    return this.genericService.post<ApiResponse<ProjectCommentsResponse[]>>(this.ProjectAddCommentUrl, request);
  }

  likeComment(request: ProjectLikeCommentModel): Observable<ApiResponse<ProjectCommentsResponse[]>> {
    return this.genericService.post<ApiResponse<ProjectCommentsResponse[]>>(this.likeCommentUrl, request);
  }
}
