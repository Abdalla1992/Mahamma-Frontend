import { MemberModel } from "../search.member.model";

export interface TaskActivityModel {
  action: string;
  taskId: number;
  taskMemberId: number;
  userId? : number;
  member : MemberModel 
  creationDate: Date;
}

