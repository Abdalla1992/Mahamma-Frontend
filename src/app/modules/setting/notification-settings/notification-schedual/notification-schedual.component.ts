import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { formatDate } from '@angular/common';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationScheduleType } from 'src/app/@AppService/Enums/notification/notification-schedule-type';
import { NotificationWeekDay } from 'src/app/@AppService/Enums/notification/notification-week-day';
import { NotificationSchedule } from 'src/app/@AppService/models/notifications/notification-schedule';
import { NotificationScheduleServiceService } from 'src/app/@AppService/services/notification/notification-schedule-service.service';
import { User } from 'src/app/@core/auth/app-user';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';
import * as moment from 'moment';
import { ApiResponse } from 'src/app/@AppService/models/response.model';

@Component({
  selector: 'app-notification-schedual',
  templateUrl: './notification-schedual.component.html',
  styleUrls: ['./notification-schedual.component.scss'],
})
export class NotificationSchedualComponent
  extends BaseAddEditComponent<NotificationSchedule, NotificationSchedule>
  implements OnInit
{
  formGroup: FormGroup;
  notificationScheduleTypeList: Array<NotificationScheduleType> = [];
  notificationWeekDay: Array<NotificationWeekDay> = [];
  notificationTypeId: number;
  showNotificationWeekDay: boolean = false;
  showDayOfMonth: boolean = false;
  currentUser: User;
  UserId: number;

  public get NotificationScheduleType(): typeof NotificationScheduleType {
    return NotificationScheduleType;
  }
  public get NotificationWeekDay(): typeof NotificationWeekDay {
    return NotificationWeekDay;
  }
  constructor(
    private notificationScheduleService: NotificationScheduleServiceService,
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    super(notificationScheduleService, modal);
    this.notificationScheduleTypeList = Object.keys(NotificationScheduleType)
      .filter((x) => !isNaN(NotificationScheduleType[x]))
      .map((x) => NotificationScheduleType[x]);
    this.notificationWeekDay = Object.keys(NotificationWeekDay)
      .filter((x) => !isNaN(NotificationWeekDay[x]))
      .map((x) => NotificationWeekDay[x]);
    this.currentUser = this.authenticationService.currentUser();
    this.UserId = this.currentUser.id;
    console.log(this.formGroup);
  }

  ngOnInit(): void {
    this.GetUserNotificationSchedule();
    this.loadForm();
    super.ngOnInit();
  }
  override save(): void {
    this.prepareEntity();
    if (!this.id) {
      this.create();
    } else {
      this.edit();
    }
  }

  override create() {
    const sbCreate = this.service
      .create(this.entity)
      .subscribe((response: ApiResponse<boolean>) => {
        if (response.isValidResponse) {
          if (response.result.responseData) {
            this.showSuccessMessage(response.result.commandMessage);
            this.GetUserNotificationSchedule();
          } else {
            this.showErrorMessage(response.result.commandMessage);
          }
        } else {
          this.showErrorMessages(response.errors);
        }
      });
  }

  override edit() {
    const sbUpdate = this.service
      .update(this.entity)
      .subscribe((response: ApiResponse<boolean>) => {
        if (response.isValidResponse) {
          if (response.result.responseData) {
            this.showSuccessMessage(response.result.commandMessage);
            this.GetUserNotificationSchedule();
          } else {
            this.showErrorMessage(response.result.commandMessage);
          }
        } else {
          this.showErrorMessages(response.errors);
        }
      });
  }
  GetUserNotificationSchedule() {
    this.notificationScheduleService
      .GetUserNotificationSchedule(this.UserId)
      .subscribe((result) => {
        if (result.isValidResponse)
          this.responseEntity = result.result.responseData;
        this.id = this.responseEntity?.id;
        this.loadForm();
      });
  }

  deleteNotificationSchedule(notificationScheduleId: number) {
    this.notificationScheduleService
      .deleteNotificationSchedule(notificationScheduleId)
      .subscribe((response) => {
        if (response.isValidResponse) {
          if (response.result.responseData) {
            this.ngOnInit();
            this.showSuccessMessage(response.result.commandMessage);
          } else {
            this.showErrorMessage(response.result.commandMessage);
          }
        } else {
          this.showErrorMessages(response.errors);
        }
      });
  }

  selectValue(event?) {
    this.notificationTypeId = event?.target?.value || this.notificationTypeId;
    if (this.notificationTypeId == NotificationScheduleType.Weekly.valueOf()) {
      this.showNotificationWeekDay = true;
      this.showDayOfMonth = false;
    } else if (
      this.notificationTypeId == NotificationScheduleType.Monthly.valueOf()
    ) {
      this.showDayOfMonth = true;
      this.showNotificationWeekDay = false;
    } else {
      this.showDayOfMonth = false;
      this.showNotificationWeekDay = false;
    }
  }
  loadForm(): void {
    this.notificationTypeId =
      this.responseEntity?.notificationScheduleTypeId || 1;
    this.selectValue();

    this.formGroup = this.fb.group({
      notificationScheduleType: [
        this.responseEntity?.notificationScheduleTypeId || 1,
      ],
      notificationWeekDay: [this.responseEntity?.weekDayId || 1],
      dayDate: [
        this.responseEntity?.monthDayId,
        Validators.compose([Validators.max(31), Validators.min(1)]),
      ],
      from: [
        this.responseEntity
          ? formatDate(this.responseEntity?.from, 'HH:mm', 'en')
          : '',
        [Validators.compose([Validators.required])],
      ],
      to: [
        this.responseEntity
          ? formatDate(this.responseEntity?.to, 'HH:mm', 'en')
          : '',
        [Validators.compose([Validators.required])],
      ],
    });
  }
  prepareEntity(): void {
    const formData = this.formGroup.value;
    this.entity.id = this.id;
    this.entity.from = formData.from;
    this.entity.to = formData.to;
    this.entity.notificationScheduleTypeId = formData.notificationScheduleType;
    this.entity.monthDayId = formData.dayDate;
    this.entity.weekDayId = formData.notificationWeekDay;
    this.entity.userId = this.UserId;
  }
  clearEntity(): void {
    if (this.entity == undefined || this.entity == null) return;
    this.entity.id = 0;
    this.entity.from = ''; //new Date().toDateString();
    this.entity.to = ''; //new Date().toDateString();
    this.entity.notificationScheduleTypeId = 0;
    this.entity.monthDayId = 0;
    this.entity.weekDayId = 0;
  }
  emptyEntity(): NotificationSchedule {
    return {
      id: undefined,
      from: '',
      to: '',
      notificationScheduleTypeId: 0,
      monthDayId: 0,
      weekDayId: 0,
      userId: 0,
    };
  }
  emptyResponseEntity(): NotificationSchedule {
    return {
      id: undefined,
      from: '',
      to: '',
      notificationScheduleTypeId: 0,
      monthDayId: 0,
      weekDayId: 0,
      userId: 0,
    };
  }
}
