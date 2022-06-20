import { DocumentModule } from './../document/document.module';
import { TaskModule } from './../task/task.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProjectComponent } from './project.component';
import { CreateComponent } from './create/create.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { InviteMembersDialogComponent } from './invite-members-dialog/invite-members-dialog.component';
import { ProjectProfileComponent } from './project-profile/project-profile.component';
import { DeleteProjectComponent } from './delete-project/delete-project.component';

import { SharedModule } from 'src/app/Page/shared.module';
import { ActivitiesComponent } from './activities/activities.component';
import { ViewAllFilesComponent } from './view-all-files/view-all-files.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ArchiveProjectComponent } from './archive-project/archive-project.component';
import { ProjectDescComponent } from './project-desc/project-desc.component';
import { ProjectHeaderComponent } from './project-header/project-header.component';
import { ProjectMeetingComponent } from './project-meeting/project-meeting.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectCharterComponent } from './project-charter/project-charter.component';
import { NgxEditorModule } from 'ngx-editor';
import { ProjectRiskPlanComponent } from './project-risk-plan/project-risk-plan.component';
import { MeetingModuleShared } from '../meeting/meeting.module.shared';
import { CommunicationPlanComponent } from './communication-plan/communication-plan.component';
import { ProjectCommentsComponent } from './project-comments/project-comments.components';
import { MentionsModule } from '@flxng/mentions';
import { DatepickerModule } from 'ng2-datepicker';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RateProjectMemberComponent } from './rate-project-member/rate-project-member.component';


@NgModule({
  declarations: [
    CreateComponent,
    AddProjectComponent,
    InviteMembersDialogComponent,
    ProjectDescComponent,
    CreateComponent,
    ProjectMeetingComponent,
    ProjectHeaderComponent,
    DeleteProjectComponent,
    ProjectComponent,
    ProjectProfileComponent,
    ActivitiesComponent,
    ViewAllFilesComponent,
    ArchiveProjectComponent,
    ProjectCharterComponent,
    ProjectRiskPlanComponent,
    CommunicationPlanComponent,
    ProjectCommentsComponent,
    RateProjectMemberComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    TaskModule,
    TranslateModule.forChild({
      defaultLanguage: "EN",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    DocumentModule,
    NgxEditorModule,
    MentionsModule,
    MeetingModuleShared,
    DatepickerModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ],
  exports:[
    ProjectCommentsComponent
    // AddProjectComponent
  ],
})
export class ProjectModule {}
