export const WorkspaceUrls = {
  ListWorkspace: 'Workspace/GetAll',
  GetWorkspaceById: 'Workspace/Get',
  CreateWorkspace: 'Workspace/Add',
  UpdateWorkspace: 'Workspace/Update',
  DeleteWorkspace: 'Workspace/Delete',
  RemoveWSMember: 'Workspace/RemoveWSMember',
};

export const ProjectUrls = {
  ListProject: 'Project/GetAll',
  GetProjecteById: 'Project/Get',
  CreateProject: 'Project/Add',
  UpdateProject: 'Project/Update',
  DeleteProject: 'Project/Delete',
  ArchiveProject: 'Project/Archive',
  AssignMember: 'Project/AssignMember',
  ProjectActivities: 'Project/GetProjectActivities',
  AddProjectFile: 'Project/AddProjectFile',
  DeleteProjectFile: 'Project/DeleteProjectFile',
  GetProjectTaskSubtaskName: 'Project/GetProjectTaskSubtaskName',
  GetProjectCharter: 'Project/GetProjectCharter',
  UpdateProjectCharter: 'Project/UpdateProjectCharter',

  GetAllProjectRiskPlans: 'Project/GetAllProjectRiskPlans',
  AddProjectRiskPlan: 'Project/AddProjectRiskPlan',
  UpdateProjectRiskPlan: 'Project/UpdateProjectRiskPlan',
  DeleteProjectRiskPlan: 'Project/DeleteProjectRiskPlan',

  GetAllProjectCommunicationPlans: 'Project/GetAllProjectCommunicationPlans',
  AddProjectCommunicationPlan: 'Project/AddProjectCommunicationPlan',
  UpdateProjectCommunicationPlan: 'Project/UpdateProjectCommunicationPlan',
  DeleteProjectCommunicationPlan: 'Project/DeleteProjectCommunicationPlan',
  ProjectAddComment: 'Project/AddComment',
  ProjectLikeComment: 'Project/LikeComment',
};
export const ProjectAttachmentUrls = {
  ListProjectAttachment: 'Project/GetProjectFiles',
  AddFolder: 'Folder/Add',
  ListFolders: 'Folder/GetAll',
  RenameFolder: 'Folder/Rename',
  GetFolder: 'Folder/Get',
  DeleteFolder: 'Folder/Delete',
  MoveFile: 'Folder/MoveFile',
};

export const TaskUrls = {
  ListTask: 'Task/GetAll',
  GetTaskById: 'Task/Get',
  CreateTask: 'Task/Add',
  CreateSubTask: 'Task/AddSub',
  UpdateTask: 'Task/Update',
  DeleteTask: 'Task/Delete',
  TaskFiles: 'Task/GetFiles',
  TaskActivities: 'Task/GetActivities',
  TaskAddComment: 'Task/Comment',
  AssignMember: 'Task/AssignMember',
  TaskSubmit: 'Task/Submit',
  TaskReview: 'Task/Review',
  ArchiveTask: 'Task/Archive',
  LikeComment: 'Task/LikeComment',
  GetUserTasks: 'Task/GetUserTasks',
  UpdateProgressPercentageUrl: 'Task/UpdateProgressPercentage',
  TaskDDL: 'Task/GetTsaksDDL',
  SubtaskDDL: 'Task/GetTsaksDDL',
  GetTaskesRejected: 'Task/GetUserTaskRejected',
  RateTaskMember: 'Task/RateMemberTask',
};

export const MeetingUrls = {
  ListMeeting: 'Meeting/GetAll',
  GetMeetingById: 'Meeting/Get',
  CreateMeeting: 'Meeting/Add',
  UpdateMeeting: 'Meeting/Update',
  CancelMeeting: 'Meeting/Cancel',
  ListMinuteOfMeeting: 'Meeting/GetMinutesMeeting',
  CreateMinuteOfMeeting: 'Meeting/AddMinuteOfMeeting',
  UpdateMinuteOfMeeting: 'Meeting/UpdateMinuteOfMeeting',
  DeleteMinuteOfMeeting: 'Meeting/DeleteMinuteOfMeeting',
  PublishAllMinutesOfMeeting: 'Meeting/PublishMinuteOfMeeting',
};

export const SubTaskUrls = {
  ListSubTask: 'SubTask/GetAll',
  GetSubTaskById: 'SubTask/Get',
  CreateSubTask: 'SubTask/Add',
  UpdateSubTask: 'SubTask/Update',
  DeleteSubTask: 'SubTask/Delete',
};
export const UserUrls = {
  ListUser: 'Account/GetAll',
  GetUserById: 'Account/Get',
  CreateUser: 'Account/Add',
  UpdateUser: 'Account/Update',
  DeleteUser: 'Account/Delete',
  GetMemberList: 'Account/GetMemberList',
  UpdateUserProfileSettingUrl: 'Account/UpdateUserProfileSetting',
  updateUserProfileSectionUrl: 'Account/UpdateProfileSection',
};

export const AuthenticationUrls = {
  LoginUrl: 'Account/Login',
  CreateAccountUrl: 'Account/Create',
  ExternalLoginUrl: 'Account/GoogleExternalLogin',
  GetUserViewActionListUrl: 'Role/GetUserPagePermissions',
  UploadProfileImage: 'Document/Upload',
  CompeleteUserProfileUrl: 'Account/Update',
  ForgetPasswordUrl: 'Account/ForgetPassword',
};

export const RolesUrls = {
  GetRole: 'Role/GetRole',
  AddRole: 'Role/Add',
  UpdateRole: 'Role/Update',
  DeleteRole: 'Role/Delete',
  GetAllCompanyRolesUrl: 'Role/GetAllCompanyRoles',
  GetAllPagePermissionUrl: 'Role/GetAllPagePermission',
  SetPagePermissionToRoleUrl: 'Role/SetPagePermissionToRole',
};

export const CompanyUrls = {
  ListCompanyWorkspace: 'Company/GetCompnayWithWorkspaces',
  AddCompany: 'Company/Add',
  GetCompanyById: 'Company/Get',
  SearchUserForWorkspaceUrl: 'Company/SearchUserForWorkspace',
  SearchUserForProjectUrl: 'Company/SearchUserForProject',
  SearchUserForTaskUrl: 'Company/SearchUserForTask',
  GetCompanyInvitationUrl: 'Company/GetCompanyInvitation',
  CreateCompanyInvitationUrl: 'Company/CreateCompanyInvitation',
  SetEmailToCompanyInvitationUrl: 'Company/SetEmailToCompanyInvitation',
  SendInvitationsFromFile: 'Company/SendInvitationsFromFile',
};

export const DashboardUrls = {
  GetProjectStatistics: 'Dashboard/GetProjectStatistics',
};

export const LanguageUrls = {
  GetAllLanguages: 'Language/GetAllLanguages',
  GetLanguage: 'Language/GetLanguage',
};

export const NotificationUrls = {
  GetNotificationsCount: '/api/Notification/GetCount',
  GetAllNotifications: '/api/Notification/GetAll',
  AllNotificationsSeen: '/api/Notification/AllNotificationsSeen',
  AddNotificationSchedule: '/api/Notification/AddNotificationSchedule',
  UpdateNotificationSchedule: '/api/Notification/UpdateNotificationSchedule',
  DeleteNotificationSchedule: '/api/Notification/DeleteNotificationSchedule',
  GetUserNotificationSchedule: '/api/Notification/GetUserNotificationSchedule',
};

export const FirebaseTokensUrls = {
  GetFirebaseToken: '/api/FirebaseToken/GetFirebaseToken',
  AddFirebaseToken: '/api/FirebaseToken/AddFirebaseToken',
  RemoveFirebaseToken: '/api/FirebaseToken/RemoveFirebaseToken',
};
