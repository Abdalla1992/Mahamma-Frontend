export interface UserProfileTaskHistory {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completedTaskPercentage: number;
  pendingTaskPercentage: number;
  rating: number;
  userTasks: UserTasks[];
}

export interface UserTasks {
  id: number;
  taskName: string;
  projectName: string;
  taskStatusId: number;
  taskStatus: string;
  taskDueDate: Date;
  workspaceName: string;
}

export interface UserTaskesRejection {
  taskName: string;
  projectName: string;
  taskStatusId: number;
  taskStatus: string;
  taskDueDate: Date;
  workspaceName: string;
}
