import { BaseModel } from './base/base.model';

export interface CompanyInvitation extends BaseModel {
  companyId: number;
  email: string;
  userId: number;
  invitationId: string;
  invitationStatusId: number;
  invitationLink: string; 
}
