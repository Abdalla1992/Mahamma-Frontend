import { BaseModel } from '../base/base.model';
import { MinuteOfMeetingResponse } from '../meeting/minute-of-meeting-response.model';
import { ProjectAttachment } from '../project.attachment.model';
import { MemberModel } from '../search.member.model';
import { TaskCommentResponse } from './task.comments.response';
import { TaskMemberModel } from './task.member.model';

export interface TaskResponse extends BaseModel {
  name: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  taskPriorityId: number;
  reviewRequest?: boolean;
  projectId: number;
  taskStatusId: number;
  parentTaskId?: number;
  parentTaskName?: string;
  taskMembers?: TaskMemberModel[];
  members?: MemberModel[];
  taskComments?: TaskCommentResponse[];
  taskAttachments: ProjectAttachment[];
  subTasks?: TaskResponse[];
  member: string;
  filesCount: number;
  workspaceId: number;
  creatorUserId: number;
  Rating?: number;
  progressPercentage: number;
  upComingMeetingDate?: Date;
  taskMinuteOfMeetings?: MinuteOfMeetingResponse[];
  projectName: string;
  dependencyTaskId: number;
}