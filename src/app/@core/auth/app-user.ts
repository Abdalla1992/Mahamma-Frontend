export class User {
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
  userProfileStatusId: number;
  roleId: number;
  languageId: number;
  bio: string;
  skills: string;
  userProfileSections?:UserProfileSectionDto[];
}

export interface UserProfileSectionDto {
  sectionId: number;
  orderId: number;
}