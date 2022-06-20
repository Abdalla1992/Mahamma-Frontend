import { BaseModel } from 'src/app/@AppService/models/base/base.model';
export interface NotificationSchedule extends BaseModel {
  from :string;
  to :string;
  userId :number;
  notificationScheduleTypeId :number;
  weekDayId?:number;
  monthDayId?:number;

}
