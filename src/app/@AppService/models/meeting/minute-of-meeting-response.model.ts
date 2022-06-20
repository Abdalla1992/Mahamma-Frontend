import { BaseModel } from "../base/base.model";

export interface MinuteOfMeetingResponse extends BaseModel {
  meetingId: number;
  description: string;
  projectId?: number;
  taskId?: number;
  isDraft: boolean;
}