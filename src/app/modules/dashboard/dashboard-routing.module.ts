import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardProjectComponent } from './dashboard-project/dashboard-project.component';
import { DashboardComponent } from './dashboard.component';
import { NewDashboardComponent } from './new-dashboard/new-dashboard.component';
import { ChartComponent } from './chart/chart.component';


const routes: Routes = [
  {
    path:'',
    component: DashboardComponent
  },
  {
    path:'chart',
    component: ChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
