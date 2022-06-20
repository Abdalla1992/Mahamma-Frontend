
import { BaseModel } from "../base/base.model";
export interface MeetingFile extends BaseModel {
    name: string;
    url: string;
    meetingId:number;
}
