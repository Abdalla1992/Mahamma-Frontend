import { BaseModel } from './base/base.model';

export interface Dashboard extends BaseModel {
  name: string;
  description: string;
  dueDate: Date;
  workSpaceId: number;
  userIdList: number[];
}
