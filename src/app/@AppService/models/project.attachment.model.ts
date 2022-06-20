import { BaseModel } from 'src/app/@AppService/models/base/base.model';
export interface ProjectAttachment extends BaseModel {
    fileName: string;
    fileUrl: string;
    projectId: number;
    taskId?: number;
}