import { ListWorkspaceComponent } from './list-workspace/list-workspace.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditWorkspaceComponent } from './add-edit-workspace/add-edit-workspace.component';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceProfileComponent } from './workspace-profile/workspace-profile.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {
        path: '',
        component: ListWorkspaceComponent,
      },
      {
        path: 'add-workspace',
        component: AddEditWorkspaceComponent,
      },
      {
        path: 'edit-workspace',
        component: AddEditWorkspaceComponent,
      },
      {
        path: 'workspace-list',
        component: ListWorkspaceComponent,
      },
      {
        path: 'workspace-profile',
        component: WorkspaceProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceRoutingModule {}
