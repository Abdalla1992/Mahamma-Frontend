import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskUrls } from '../../Common/ServiceUrls';
import { ApiResponse } from '../../models/response.model';
import { TaskResponse } from '../../models/task/task.response.model';
import { TaskActivityModel } from '../../models/task/task.activity.model';
import { BaseService } from '../Base/base.service';
import { GenericService } from '../Base/GenericService';
import { TaskRequest } from '../../models/task/task.request.model';
import { ProjectAttachment } from '../../models/project.attachment.model';
import {
  LikeCommentModel,
  TaskCommentRequest,
} from '../../models/task/task.comments.request';
import { TaskCommentResponse } from '../../models/task/task.comments.response';
import {
  UserProfileTaskHistory,
  UserTaskesRejection,
} from '../../models/user-profile-task-history.model';
import { catchError, finalize } from 'rxjs/operators';
import { ProgressPercentageModel } from '../../models/task/progress-percentage.model';
import { TaskMemberModel } from '../../models/task/task.member.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService
  extends BaseService<TaskRequest, TaskResponse>
  implements OnDestroy
{
  taskId: number;
  archiveUrl: string;
  likeCommentUrl: string;
  getUserTasksUrl: string;
  updateProgressPercentageUrl: string;
  taskDDLUrl: string;
  subtaskDDLUrl: string;
  getUserTasksRejectedUrl: string;
  raate: string;

  constructor(
    @Inject(HttpClient) http,
    private genericService: GenericService
  ) {
    super(http);

    this.Urls.ListUrl = environment.mahammaApiBaseUrl + TaskUrls.ListTask;
    this.Urls.GetByIdUrl = environment.mahammaApiBaseUrl + TaskUrls.GetTaskById;
    this.Urls.CreateUrl = environment.mahammaApiBaseUrl + TaskUrls.CreateTask;
    this.Urls.UpdateUrl = environment.mahammaApiBaseUrl + TaskUrls.UpdateTask;
    this.Urls.DeleteUrl = environment.mahammaApiBaseUrl + TaskUrls.DeleteTask;
    this.Urls.TaskFilesUrl = environment.mahammaApiBaseUrl + TaskUrls.TaskFiles;
    this.Urls.TaskActivitiesUrl =
      environment.mahammaApiBaseUrl + TaskUrls.TaskActivities;
    this.Urls.TaskAddCommentUrl =
      environment.mahammaApiBaseUrl + TaskUrls.TaskAddComment;
    this.Urls.TaskAssignMemberUrl =
      environment.mahammaApiBaseUrl + TaskUrls.AssignMember;
    this.Urls.TaskSubmitUrl =
      environment.mahammaApiBaseUrl + TaskUrls.TaskSubmit;
    this.Urls.TaskReviewUrl =
      environment.mahammaApiBaseUrl + TaskUrls.TaskReview;
    this.archiveUrl = environment.mahammaApiBaseUrl + TaskUrls.ArchiveTask;
    this.Urls.ArchiveUrl = environment.mahammaApiBaseUrl + TaskUrls.ArchiveTask;
    this.likeCommentUrl = environment.mahammaApiBaseUrl + TaskUrls.LikeComment;
    this.getUserTasksUrl =
      environment.mahammaApiBaseUrl + TaskUrls.GetUserTasks;
    this.updateProgressPercentageUrl =
      environment.mahammaApiBaseUrl + TaskUrls.UpdateProgressPercentageUrl;
    this.taskDDLUrl = environment.mahammaApiBaseUrl + TaskUrls.TaskDDL;
    this.subtaskDDLUrl = environment.mahammaApiBaseUrl + TaskUrls.SubtaskDDL;
    this.getUserTasksRejectedUrl =
      environment.mahammaApiBaseUrl + TaskUrls.GetTaskesRejected;
    this.Urls.RateMemberTaskUrl =
      environment.mahammaApiBaseUrl + TaskUrls.RateTaskMember;
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  override getItemById(
    id: number,
    requestedFromMeeting?: boolean
  ): Observable<any> {
    let meetingCondition =
      requestedFromMeeting != undefined && requestedFromMeeting
        ? '&requestedFromMeeting=' + requestedFromMeeting
        : '';
    return this.http
      .get<any>(this.Urls.GetByIdUrl + '?id=' + id + meetingCondition)
      .pipe(
        catchError((err) => {
          this._errorMessage.next(err);
          console.error('GET ITEM BY IT', id, err);
          return of({ id: undefined, activationStatus: '' });
        }),
        finalize(() => this._isLoading$.next(false))
      );
  }

  override create(item: TaskRequest): Observable<any> {
    if (item.parentTaskId && item.parentTaskId > 0)
      this.Urls.CreateUrl =
        environment.mahammaApiBaseUrl + TaskUrls.CreateSubTask;
    return super.create(item);
  }

  GetTask(taskId: number): Observable<ApiResponse<TaskResponse>> {
    var response = this.genericService.get<ApiResponse<TaskResponse>>(
      this.Urls.GetByIdUrl + '?id=' + taskId
    );
    return response;
  }

  GetTaskFiles(taskId: number): Observable<ApiResponse<ProjectAttachment[]>> {
    return this.genericService.get<ApiResponse<ProjectAttachment[]>>(
      this.Urls.TaskFilesUrl + '?id=' + taskId
    );
  }

  GetTaskActivites(
    taskId: number
  ): Observable<ApiResponse<TaskActivityModel[]>> {
    return this.genericService.get<ApiResponse<TaskActivityModel[]>>(
      this.Urls.TaskActivitiesUrl + '?id=' + taskId
    );
  }

  AddComment(
    request: TaskCommentRequest
  ): Observable<ApiResponse<TaskCommentResponse[]>> {
    return this.genericService.post<ApiResponse<TaskCommentResponse[]>>(
      this.Urls.TaskAddCommentUrl,
      request
    );
  }

  likeComment(
    request: LikeCommentModel
  ): Observable<ApiResponse<TaskCommentResponse[]>> {
    return this.genericService.post<ApiResponse<TaskCommentResponse[]>>(
      this.likeCommentUrl,
      request
    );
  }

  assignMember(
    taskId: number,
    userIdList: number[]
  ): Observable<ApiResponse<boolean>> {
    return this.genericService.post<ApiResponse<boolean>>(
      this.Urls.TaskAssignMemberUrl,
      {
        taskId: taskId,
        userIdList: userIdList,
      }
    );
  }

  submitTask(
    taskId: number,
    durationInHours: number
  ): Observable<ApiResponse<boolean>> {
    return this.genericService.post<ApiResponse<boolean>>(
      this.Urls.TaskSubmitUrl,
      {
        taskId: taskId,
        durationInHours: durationInHours,
      }
    );
  }

  reviewTask(
    taskId: number,
    taskMembers: TaskMemberModel[],
    accpeted: boolean,
    description: string
  ): Observable<ApiResponse<boolean>> {
    return this.genericService.post<ApiResponse<boolean>>(
      this.Urls.TaskReviewUrl,
      {
        taskId: taskId,
        taskMembers: taskMembers,
        accpeted: accpeted,
        description: description,
      }
    );
  }

  rateMemberTask(
    taskId: number,
    taskMembers: TaskMemberModel[]
  ): Observable<ApiResponse<boolean>> {
    return this.genericService.post<ApiResponse<boolean>>(
      this.Urls.RateMemberTaskUrl,
      {
        taskId: taskId,
        taskMembers: taskMembers,
      }
    );
  }

  archive(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      this.archiveUrl + '?id=' + id
    );
  }

  getUserTasks(
    userId: number
  ): Observable<ApiResponse<UserProfileTaskHistory>> {
    return this.genericService.get<ApiResponse<UserProfileTaskHistory>>(
      this.getUserTasksUrl + '?userId=' + userId
    );
  }

  updateProgressPercentage(
    progressPercentage: ProgressPercentageModel
  ): Observable<ApiResponse<boolean>> {
    return this.genericService.post<ApiResponse<boolean>>(
      this.updateProgressPercentageUrl,
      progressPercentage
    );
  }

  getTaskDDL(projectId: number): Observable<any> {
    return this.genericService.get<any>(
      this.taskDDLUrl + '?projectId=' + projectId
    );
  }

  getSubtaskDDL(taskId: number): Observable<any> {
    return this.genericService.get<any>(
      this.subtaskDDLUrl + '?taskId=' + taskId
    );
  }

  getUserTasksRejected(
    userId: number
  ): Observable<ApiResponse<UserTaskesRejection[]>> {
    return this.genericService.get<ApiResponse<UserTaskesRejection[]>>(
      this.getUserTasksRejectedUrl + '?userId=' + userId
    );
  }
}
