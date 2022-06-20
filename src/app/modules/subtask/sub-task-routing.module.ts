import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubTaskComponent } from './sub-task.component';

const routes: Routes = [
  {
    path:'',
    component: SubTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubTaskRoutingModule { }
