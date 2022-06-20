export interface MinuteOfMeetingRequest {
  meetingId: number;
  minuteOfMeetingLevel: number;
  description?: string;
  projectId?: number;
  taskId?: number;
}