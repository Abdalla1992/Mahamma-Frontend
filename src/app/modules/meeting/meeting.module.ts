import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingTitleComponent } from './meeting-title/meeting-title.component';
import { MeetingComponent } from './meeting.component';
import { createTranslateLoader } from 'src/app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/Page/shared.module';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { MeetingProfileComponent } from './meeting-profile/meeting-profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MinutesOfMeetingComponent } from './minutes-of-meeting/minutes-of-meeting.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { TaskModule } from '../task/task.module';
import { SubTaskModule } from '../subtask/sub-task.module';
import { ProjectModule } from '../project/project.module';
import { MinutesOfMeetingListComponent } from './minutes-of-meeting-list/minutes-of-meeting-list.component';
import { MinuteOfMeetingDescription } from './minute-of-meeting-description/minute-of-meeting-description.component';
import { MeetingModuleShared } from './meeting.module.shared';
import { ActionListComponent } from './action-list/action-list.component';
import { AttendeeListComponent } from './attendee-list/attendee-list.component';
import { MatSliderModule } from '@angular/material/slider';
import { IgxProgressBarModule } from 'igniteui-angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [
    MeetingTitleComponent,
    MeetingComponent,
    AddMeetingComponent,
    MeetingProfileComponent,
    MinutesOfMeetingComponent,
    ActionListComponent,
    AttendeeListComponent,
    MinutesOfMeetingComponent,
    MinutesOfMeetingListComponent,
    MinuteOfMeetingDescription
  ],
  imports: [
    CommonModule,
    MeetingRoutingModule,
    TranslateModule.forChild({
      defaultLanguage: "EN",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    FormsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatSliderModule,
    IgxProgressBarModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    ProjectModule,
    TaskModule,
    SubTaskModule,
    MeetingModuleShared,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class MeetingModule { }
