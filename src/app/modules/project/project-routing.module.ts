import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectComponent } from './project.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteProjectComponent } from './delete-project/delete-project.component';
import { InviteMembersDialogComponent } from './invite-members-dialog/invite-members-dialog.component';
import { ProjectProfileComponent } from './project-profile/project-profile.component';
import { ViewAllFilesComponent } from './view-all-files/view-all-files.component';
import { ProjectCharterComponent } from './project-charter/project-charter.component';
import { ProjectRiskPlanComponent } from './project-risk-plan/project-risk-plan.component';
import { CommunicationPlanComponent } from './communication-plan/communication-plan.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {
        path: 'add-project',
        component: AddProjectComponent,
      },
      {
        path: 'project-profile',
        component: ProjectProfileComponent,
      },
      {
        path: 'add-member',
        component: InviteMembersDialogComponent,
      },
      {
        path: 'view-all-files',
        component: ViewAllFilesComponent,
      },
      {
        path: 'delete-project',
        component: DeleteProjectComponent,
      },
      {
        path: 'project-charter',
        component: ProjectCharterComponent,
      },
      {
        path: 'project-risk-plan',
        component: ProjectRiskPlanComponent,
      },
      {
        path: 'project-communication-plan',
        component: CommunicationPlanComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
