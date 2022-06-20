import { ProjectAttachment } from 'src/app/@AppService/models/project.attachment.model';
import { BaseModel } from './base/base.model';
import { MinuteOfMeetingResponse } from './meeting/minute-of-meeting-response.model';
import { ProjectCommentsResponse } from './project-comments-response';
import { MemberModel } from './search.member.model';

export interface Project extends BaseModel {
  name: string;
  description: string;
  dueDate: Date;
  workSpaceId: number;
  creatorUserId: number;
  userIdList: number[];
  member: string;
  members: MemberModel[];
  projectAttachments: ProjectAttachment[];
  projectComments?: ProjectCommentsResponse[];
  filesCount: number;
  progressPercentage: number;
  upComingMeetingDate?: Date;
  projectMinuteOfMeetings?: MinuteOfMeetingResponse[];
  isCreatedFromMeeting? : boolean;
}
