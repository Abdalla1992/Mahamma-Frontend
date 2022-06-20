import { BaseModel } from "../base/base.model";
import { AgendaTopic } from "./agenda-topic-model";
import { MeetingFile } from "./meeting-file-model";
import { MemberMeetingRolesRequest } from "./member-meeting-roles-model";

export interface MeetingRequest extends BaseModel {
    title: string;
    date: Date;
    duration: number;
    durationUnitType: number;
    workspaceId?: number;
    projectId?: number;
    taskId?: number;
    members?: MemberMeetingRolesRequest[];
    agenda?: AgendaTopic[];
    isOnline: boolean;
    meetingFiles?:MeetingFile[];
  }
