import { BaseModel } from "../base/base.model";
import { MemberModel } from "../search.member.model";

export interface MinuteOfMeetingActionResponse extends BaseModel {
  meetingId: number;
  actionTitle: string;
  actionLevel: number;
  members?: MemberModel[];
  progressPercentage: number;
  isDraft: boolean;
  workspaceId?: number;
  projectId?: number;
  taskId?: number;
  parentTaskId? : number;
  description? : string;
}