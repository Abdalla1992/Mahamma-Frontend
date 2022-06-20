import { MeetingRole } from "../../Enums/meeting/meeting-role";
import { MemberModel } from "../search.member.model";

export interface MemberMeetingRoles {
    user: MemberModel;
    meetingRole: MeetingRole[];
}

export interface MemberMeetingRolesRequest {
    userId: number;
    meetingRoles: MeetingRole[];
}