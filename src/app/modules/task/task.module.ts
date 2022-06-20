import { DocumentModule } from './../document/document.module';
import { SubTaskModule } from './../subtask/sub-task.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { SharedModule } from 'src/app/Page/shared.module';
import { TaskActivitiesComponent } from './task-activities/task-activities.component';
import { TasksCommentsComponent } from './tasks-comments/tasks-comments.component';
import { SaveChangeComponent } from './save-change/save-change.component';
import { SubmitTaskComponent } from './submit-task/submit-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { InviteMembersDialogComponent } from './invite-members-dialog/invite-members-dialog.component';
import { MatSliderModule } from '@angular/material/slider';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CardTaskListComponent } from './card-task-list/card-task-list.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MentionsModule } from '@flxng/mentions';
import { ReviewTaskComponent } from './review-task/review-task.component';
import { UpdateProgressPercentageComponent } from './update-progress-percentage/update-progress-percentage.component';
import { MeetingModuleShared } from '../meeting/meeting.module.shared';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DatepickerModule } from 'ng2-datepicker';
import { RateMemberTaskComponent } from './rate-member-task/rate-member-task.component';

@NgModule({
  declarations: [
    TaskComponent,
    TaskActivitiesComponent,
    TasksCommentsComponent,
    SaveChangeComponent,
    SubmitTaskComponent,
    AddTaskComponent,
    TasksListComponent,
    InviteMembersDialogComponent,
    CardTaskListComponent,
    ReviewTaskComponent,
    UpdateProgressPercentageComponent,
    RateMemberTaskComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    NgxDropzoneModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatCardModule,
    MatProgressBarModule,
    TranslateModule.forChild({
      defaultLanguage: "EN",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SubTaskModule,
    DocumentModule,
    ReactiveFormsModule,
    MatSliderModule,
    MentionsModule,
    MeetingModuleShared,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    DatepickerModule
  ],
  exports: [
    TasksCommentsComponent,
    TasksListComponent,
    AddTaskComponent
  ],
  providers: [
    DatePipe
  ]
})
export class TaskModule { }
