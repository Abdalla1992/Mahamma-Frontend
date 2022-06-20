import { BaseModel } from './base/base.model';

export interface User extends BaseModel{  
  profileImage: string;
  fullName: string;
  jobTitle: string;
  userName: string;
  email: string;
  phoneNumber: string;
  workingDays: number;
  workingHours: number;
  companyId: number;
  authToken: string;
  userProfileStatusId: number;
  roleId: number;
  languageId: number;
  bio: string;
  skills: string;
}
