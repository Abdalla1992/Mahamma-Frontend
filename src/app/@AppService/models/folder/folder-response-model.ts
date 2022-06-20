import { BaseModel } from "../base/base.model";

export interface FolderResponse extends BaseModel {
    name: string;
    projectId: number;
    taskId: number;
}