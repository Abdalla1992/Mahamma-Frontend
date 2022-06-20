import { BaseModel } from "../base/base.model";
import { MemberModel } from "../search.member.model";
import { AgendaTopic } from "./agenda-topic-model";
import { MeetingFile } from "./meeting-file-model";

export interface MeetingResponse extends BaseModel {
    title: string;
    date: Date;
    duration: number;
    durationUnitType: number;
    workspaceId?: number;
    projectId?: number;
    taskId?: number;
    memberList?: Record<number, number[]>[];
    attendanceIdList?: number[];
    agendaTopics?: AgendaTopic[];
    members?: MemberModel[];
    creatorUserId: number;
    isOnline: boolean;
    joinUrl: string;
    meetingFiles?:MeetingFile[];
  }

