import { BaseModel } from 'src/app/@AppService/models/base/base.model';
export interface Company extends BaseModel{
  name: string;
  companySize: string;
  folderPath: string;
  descreption: string;
}
