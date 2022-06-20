import { BaseModel } from "../base/base.model";

export interface TaskRequest extends BaseModel {
  name: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  taskPriorityId: number;
  projectId: number;
  parentTaskId?: number;
  reviewRequest?: boolean;
  taskStatusId: number;
  userIdList?: number[],
  files?: string[],
  dependencyTaskId: number;
  isCreatedFromMeeting? : boolean;
}
