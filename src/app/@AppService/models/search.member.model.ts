export interface MemberModel {
  userId: number;
  fullName: string;
  profileImage: string;
  workspaceId: number;
  workspaceName: string;
  rating: number;
}

export interface SearchUserForWorkspace {
  name: string;
  workspaceId: number;
}

export interface SearchUserForProject {
  name: string;
  projectId: number;
}

export interface SearchUserForTask {
  name: string;
  taskId: number;
}
