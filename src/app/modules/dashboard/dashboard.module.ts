import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardWorkloadComponent } from './dashboard-workload/dashboard-workload.component';
import { SharedModule } from 'src/app/Page/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardProjectComponent } from './dashboard-project/dashboard-project.component';
import { DashboardTitleComponent } from './dashboard-title/dashboard-title.component';
import { NewDashboardComponent } from './new-dashboard/new-dashboard.component';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TaskModule } from '../task/task.module';
import { SubTaskModule } from '../subtask/sub-task.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardWorkloadComponent,
    DashboardProjectComponent,
    DashboardTitleComponent,
    NewDashboardComponent,
    ChartComponent
    ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ChartsModule,
    NgbModule,
    TaskModule,
    SubTaskModule,
    MatDividerModule,
    MatCardModule,
    TranslateModule.forChild({
      defaultLanguage: "EN",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatSelectModule,
    FontAwesomeModule
  ]
})
export class DashboardModule { }
