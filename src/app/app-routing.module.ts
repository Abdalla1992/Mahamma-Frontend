import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@core/auth/auth.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomeModule)
  },
  {
    path: 'workspace',
    //canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/workspace/workspace.module').then((m) => m.WorkspaceModule),
  },
  {
    path:'home',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomeModule)
  },
  {
    path:'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then( m => m.DashboardModule)
  },
  {
    path:'project',
    //canActivate: [AuthGuard],
    loadChildren: () => import('./modules/project/project.module').then( m => m.ProjectModule)
  },
  {
    path:'task',
    loadChildren: () => import('./modules/task/task.module').then(m => m.TaskModule)
  },
  {
    path:'sub-task/:id',
    loadChildren: () => import('./modules/subtask/sub-task.module').then(m => m.SubTaskModule)
  },
  {
    path:'documents',
    loadChildren: () => import('./modules/document/document.module').then(m => m.DocumentModule),
  },
  // {
  //   path:'sub-task',
  //   loadChildren: () => import('./modules/subtask/sub-task.module').then(m => m.SubTaskModule)
  // },
  {
    path:'profile/:id',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path:'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then( m => m.DashboardModule)
  },
  {
    path:'setting',
    loadChildren: () => import('./modules/setting/setting.module').then(m => m.SettingModule)
  },
  {
    path:'notifications',
    loadChildren: () => import('./modules/notifications/notifications.module').then(m => m.NotificationsModule)
  },
  {
    path:'search',
    loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'meeting',
    loadChildren: () => import('./modules/meeting/meeting.module').then(m => m.MeetingModule)
  },
  {
    path: 'my-work-notes',
    loadChildren: () => import('./modules/my-work-notes/my-work-notes.module').then( m => m.MyWorkNotesModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
