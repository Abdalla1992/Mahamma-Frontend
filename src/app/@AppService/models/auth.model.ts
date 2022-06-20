import { BaseModel } from 'src/app/@AppService/models/base/base.model';
export interface LoginUser {
  email: string;
  password: string;
}

export interface NewUser {
  email: string;
  password: string;
  confirmpassword: string;
  invitationId: string;
}

export interface CompeleteUserProfile {
  profileImage: string;
  fullName: string;
  jobTitle: string;
  workingDays: number;
  workingHours: number;
  invitationId: string;
}

export interface CompanyModel extends BaseModel {
  name: string;
  companySize: string;
  descreption: string;
  member: string;
  invitationsEmails: string[];
}

export class LoginResponse {
  id: number;
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
export interface UserViewAction {
  pageId: number;
}
