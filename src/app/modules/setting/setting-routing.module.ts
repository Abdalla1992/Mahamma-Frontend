import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { SettingComponent } from './setting.component';
import { AddEditRolePermissionComponent } from './permissions/addedit-role-permission/addedit-role-permission.component';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
initializeApp(environment.firebase);

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      {
        path: 'general-setting',
        component: GeneralSettingComponent,
      },
      {
        path: 'notifications-setting',
        component: NotificationSettingsComponent,
      },
      {
        path: 'permissions',
        component: PermissionsComponent,
      },
      {
        path: 'permissions/addedit',
        component: AddEditRolePermissionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
