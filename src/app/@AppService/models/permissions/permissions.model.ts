import { User } from "src/app/@core/auth/app-user";
import { BaseModel } from "../base/base.model";

export interface RoleRequestModel extends BaseModel {
  name: string;
  userIds?: number[];
  pagePermissionIds?: number[];
}

export interface RoleResponseModel extends BaseModel {
  name: string;
  users?: User[];
  pagePermissions?: PagePermissionModel[];
}


export interface PageModel extends BaseModel {
  name: string;
}

export interface PagePermissionModel extends BaseModel {
  pageId: number;
  permissionId: number;
  page: PageModel;
  pageName: string;
  permissionName: string;
}