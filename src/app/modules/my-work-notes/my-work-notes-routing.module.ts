import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyWorkNotesComponent } from './my-work-notes.component';

const routes: Routes = [
  {
    path:'',
    component: MyWorkNotesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWorkNotesRoutingModule { }
