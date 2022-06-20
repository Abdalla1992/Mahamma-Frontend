import { TaskResponse } from "../task/task.response.model";

export interface DashboardStatisticsResponse {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  tasks: any[];
  subTasks: any[];
  completedTasksStatistics: any[];
  notCompletedTasksStatistics: any[];
  completedSubTasksStatistics: any[];
  notCompletedSubTasksStatistics: any[];
}

export interface DashboardModel {
  projectStatistics: DashboardStatisticsResponse;
  tasks: TaskResponse[];
  subtasks: TaskResponse[];
}