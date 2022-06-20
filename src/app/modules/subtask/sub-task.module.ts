import { SubTaskCommentsComponent } from './sub-task-comments/sub-task-comments.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SubTaskRoutingModule } from './sub-task-routing.module';
import { SubTaskArchiveComponent } from './sub-task-archive/sub-task-archive.component';
import { SubTaskDeleteComponent } from './sub-task-delete/sub-task-delete.component';
import { AddSubTaskComponent } from './add-sub-task/add-sub-task.component';
import { SubTaskComponent } from './sub-task.component';
import { SharedModule } from 'src/app/Page/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { SubTasksListComponent } from './sub-tasks-list/sub-tasks-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskModule } from '../task/task.module';
import { DocumentModule } from '../document/document.module';
import { SubmitSubTaskComponent } from './submit-subtask/submit-subtask.component';
import { InviteMembersDialogComponent } from './invite-members-dialog/invite-members-dialog.component';
import { SubTaskActivitiesComponent } from './sub-task-activities/sub-task-activities.component';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { CardSubTaskListComponent } from './card-sub-task-list/card-sub-task-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MentionsModule } from '@flxng/mentions';
import { ReviewSubTaskComponent } from './review-sub-task/review-sub-task.component';
import { UpdateProgressPercentageComponent } from './update-progress-percentage/update-progress-percentage.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DatepickerModule } from 'ng2-datepicker';

@NgModule({
  declarations: [
    SubTaskArchiveComponent,
    SubTaskArchiveComponent,
    SubTaskDeleteComponent,
    AddSubTaskComponent,
    SubTaskComponent,
    SubTasksListComponent,
    SubmitSubTaskComponent,
    SubTaskCommentsComponent,
    InviteMembersDialogComponent,
    SubTaskActivitiesComponent,
    CardSubTaskListComponent,
    ReviewSubTaskComponent,
    UpdateProgressPercentageComponent
  ],
  imports: [
    CommonModule,
    SubTaskRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    DocumentModule,
    MatSliderModule,
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
    NgxDropzoneModule,
    TranslateModule.forChild(),
    MentionsModule,
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
  exports: [SubTasksListComponent, SubTaskCommentsComponent, AddSubTaskComponent]
})
export class SubTaskModule { }
