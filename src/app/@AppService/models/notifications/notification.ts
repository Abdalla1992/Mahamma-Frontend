import { MemberModel } from "../search.member.model";

export interface NotificationModel {
    workSpaceId: number;
    projectId: number;
    taskId: number;
    meetingId: number;
    notificationSendingTypeId: number;
    notificationSendingStatusId: number;
    notificationTypeId: number;
    senderUserId: number;
    receiverUserId: number;
    receiverMember: MemberModel;
    isRead: boolean;
}