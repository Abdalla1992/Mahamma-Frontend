import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartTypeEnum } from 'src/app/@AppService/Enums/chart-typs-enum';
import { TaskPriority } from 'src/app/@AppService/Enums/task.priority';
import { TaskStatus } from 'src/app/@AppService/Enums/task.status';
import { DashboardStatisticsRequest } from 'src/app/@AppService/models/dashboard/dashboard.statistics.request';
import { DashboardStatisticsResponse } from 'src/app/@AppService/models/dashboard/dashboard.statistics.response';
import { Project } from 'src/app/@AppService/models/project.model';
import { TaskResponse } from 'src/app/@AppService/models/task/task.response.model';
import { DashboardService } from 'src/app/@AppService/services/dashboard/dashboard.service';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
import { InviteMembersDialogComponent } from '../subtask/invite-members-dialog/invite-members-dialog.component';
import { UpdateProgressPercentageComponent } from '../subtask/update-progress-percentage/update-progress-percentage.component';
import { SubmitTaskComponent } from '../task/submit-task/submit-task.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  disableSelect = new FormControl(false);
  private modalService: NgbModal;

  public get ChartTypeEnum(): typeof ChartTypeEnum {
    return ChartTypeEnum;
  }

  public get TaskStatus(): typeof TaskStatus {
    return TaskStatus;
  }
  
  public get TaskPriority(): typeof TaskPriority {
    return TaskPriority;
  }

  chartsRequest: DashboardStatisticsRequest =
  {
    projectIdList: []
  }
  chartResult: DashboardStatisticsResponse;
  projectList: Project[];
  projectIds: number[] = [];
  tasks: TaskResponse[];
  subtasks: TaskResponse[];
  inActiveTask: TaskResponse[];
  pendingTask: TaskResponse[];
  doneTask: TaskResponse[];
  inActiveSubtask: TaskResponse[];
  pendingSubtask: TaskResponse[];
  doneSubtask: TaskResponse[];
  notCompletedTasks: TaskResponse[] = [];
  NotCompletedSubtasks: TaskResponse[] = [];
  pendingTasksPercentage: string;
  inprogressTasksPercentage: string;
  completedTasksPercentage: string;
  cardView: boolean = false;
  listView: boolean = true;
  subtaskCardView: boolean = false;
  subtaskListView: boolean = true;
  

  constructor(private dashboardService: DashboardService,
    private projectService: ProjectService,
    private taskService: TaskService) {
    super();
    const injector = AppInjector.getInjector();
    this.modalService = injector.get(NgbModal);
  }

  ngOnInit(): void {
    this.drawCharts();
    this.projectService.getProjectList().subscribe(result => {
      this.projectList = result.responseData;
      this.projectList.forEach(p => this.projectIds.push(p.id));
    });
  }

  onProjectChange(event) {
    let projectId = event.target.value;
    this.chartsRequest.projectIdList = projectId != 0 ? [projectId] : [];
    if (projectId > 0)
      this.projectIds = [projectId];
    else {
      this.projectList.forEach(p => this.projectIds.push(p.id));
    }
    this.drawCharts();
  }

  drawCharts() {
    this.dashboardService.getProjectStatistics(this.chartsRequest).subscribe(result => {
      if (result.result.responseData) {
        this.chartResult = result.result.responseData.projectStatistics;
        this.tasks = result.result.responseData.tasks;
        this.subtasks = result.result.responseData.subtasks;
        this.inActiveTask = this.tasks.filter(t => t.taskStatusId == this.TaskStatus.InProgress || t.taskStatusId == this.TaskStatus.InProgressWithDelay);
        this.pendingTask = this.tasks.filter(t => t.taskStatusId == this.TaskStatus.New);
        this.doneTask = this.tasks.filter(t => t.taskStatusId == this.TaskStatus.CompletedEarly
          || t.taskStatusId == this.TaskStatus.CompletedLate
          || t.taskStatusId == this.TaskStatus.CompletedOnTime);
        this.inActiveSubtask = this.subtasks.filter(t => t.taskStatusId == this.TaskStatus.InProgress || t.taskStatusId == this.TaskStatus.InProgressWithDelay);
        this.pendingSubtask = this.subtasks.filter(t => t.taskStatusId == this.TaskStatus.New);
        this.doneSubtask = this.subtasks.filter(t => t.taskStatusId == this.TaskStatus.CompletedEarly
          || t.taskStatusId == this.TaskStatus.CompletedLate
          || t.taskStatusId == this.TaskStatus.CompletedOnTime);
        this.pendingTasksPercentage = ((this.chartResult.pendingTasks / this.chartResult.totalTasks) * 100).toFixed(2);
        this.inprogressTasksPercentage = ((this.chartResult.inProgressTasks / this.chartResult.totalTasks) * 100).toFixed(2);
        this.completedTasksPercentage = ((this.chartResult.completedTasks / this.chartResult.totalTasks) * 100).toFixed(2);
      } else {
        this.chartResult = {
          totalTasks: 0, completedTasks: 0, pendingTasks: 0, inProgressTasks: 0, tasks: [], subTasks: [],
          completedTasksStatistics: [], notCompletedTasksStatistics: [],
          completedSubTasksStatistics: [], notCompletedSubTasksStatistics: []
        };
        this.tasks = [];
        this.subtasks = [];
        this.inActiveTask = [];
        this.pendingTask = [];
        this.doneTask = [];
        this.inActiveSubtask = [];
        this.pendingSubtask = [];
        this.doneSubtask = [];
      }
    });
  }
  
  showCardView(event) {
    this.cardView = true;
    this.listView = false;
    this.inActiveTask = this.tasks.filter(t => t.taskStatusId == this.TaskStatus.InProgress || t.taskStatusId == this.TaskStatus.InProgressWithDelay);
    this.pendingTask = this.tasks.filter(t => t.taskStatusId == this.TaskStatus.New);
    this.doneTask = this.tasks.filter(t => t.taskStatusId == this.TaskStatus.CompletedEarly
      || t.taskStatusId == this.TaskStatus.CompletedLate
      || t.taskStatusId == this.TaskStatus.CompletedOnTime);
  }
  showListView(event) {
    this.listView = true;
    this.cardView = false;
  }
  navigateToTaskProfile(id: number) {
    this.navigateToUrl('/task/');
    this.taskService.taskId = id;
  }

  showSubtaskCardView(event) {
    this.subtaskCardView = true;
    this.subtaskListView = false;
    this.inActiveSubtask = this.subtasks.filter(t => t.taskStatusId == this.TaskStatus.InProgress || t.taskStatusId == this.TaskStatus.InProgressWithDelay);
    this.pendingSubtask = this.subtasks.filter(t => t.taskStatusId == this.TaskStatus.New);
    this.doneSubtask = this.subtasks.filter(t => t.taskStatusId == this.TaskStatus.CompletedEarly
      || t.taskStatusId == this.TaskStatus.CompletedLate
      || t.taskStatusId == this.TaskStatus.CompletedOnTime);
  }
  showSubtaskListView(event) {
    this.subtaskListView = true;
    this.subtaskCardView = false;
  }

  navigateToSubTaskProfile(id: number) {
    this.navigateToUrl('/sub-task/');
    this.taskService.taskId = id;
  }

  updateProgressPercentagePopup(task: TaskResponse) {
    const modalRef = this.modalService.open(UpdateProgressPercentageComponent, {
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.taskId = task.id;
    modalRef.componentInstance.progressPercentage = task.progressPercentage;
    modalRef.componentInstance.progressPercentageUpdatedOutput.subscribe(this.ngOnInit());
    modalRef.result.then(() => { });
  }

  openTaskSubmit(task: TaskResponse) {
    const modalRef = this.modalService.open(SubmitTaskComponent, {
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.taskId = task.id;
    modalRef.componentInstance.reloadCurrentPage = true;
    modalRef.componentInstance.entityUpdatedOutput.subscribe(this.ngOnInit());
    modalRef.result.then(() => { });
  }

  openInviteMember(task: TaskResponse) {
    const modalRef = this.modalService.open(InviteMembersDialogComponent, {
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.taskId = task.id;
    modalRef.componentInstance.members = task.members;
    modalRef.result.then(() => { });
  }
}

