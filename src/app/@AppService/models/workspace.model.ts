import { BaseModel } from './base/base.model';
import { MemberModel } from './search.member.model';

export interface Workspace extends BaseModel {
  name: string;
  imageUrl: string;
  color: string;
  userIdList: number[];
  member: string;
  members: MemberModel[] 
}
