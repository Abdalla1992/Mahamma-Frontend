import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'src/app/Page/shared.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { ProfileComponent } from './profile.component';
import { UserTasksPercentageComponent } from './user-tasks-percentage/user-tasks-percentage.component';
import { UserDescComponent } from './user-desc/user-desc.component';
import { UserWorkHistoryComponent } from './user-work-history/user-work-history.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    ProfileComponent,
    UserInfoComponent,
    UserTasksPercentageComponent,
    UserDescComponent,
    UserWorkHistoryComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    NgbModule,
    TranslateModule.forChild({
      defaultLanguage: "EN",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class ProfileModule { }
