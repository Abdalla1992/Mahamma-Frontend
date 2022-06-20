import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { SharedModule } from 'src/app/Page/shared.module';
import { SettingListComponent } from './setting-list/setting-list.component';
import { SettingComponent } from './setting.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEditRolePermissionComponent, } from './permissions/addedit-role-permission/addedit-role-permission.component';
import { NotificationHeaderComponent } from './notification-settings/notification-header/notification-header.component';
import { NotificationSchedualComponent } from './notification-settings/notification-schedual/notification-schedual.component';
import { PreferenceComponent } from './general-setting/preference/preference.component';
import { PermissionHeaderComponent } from './permissions/permission-header/permission-header.component';
import { PermissionListComponent } from './permissions/permission-list/permission-list.component';
import { GeneralUserInfoComponent } from './general-setting/general-user-info/general-user-info.component';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    GeneralSettingComponent,
    PermissionsComponent,
    SettingListComponent,
    SettingComponent,
    PreferenceComponent,
    PermissionListComponent,
    PermissionHeaderComponent,
    AddEditRolePermissionComponent,
    NotificationHeaderComponent,
    NotificationSchedualComponent,
    GeneralSettingComponent,
    GeneralUserInfoComponent,
    NotificationSettingsComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild({
      defaultLanguage: "EN",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSliderModule
  ]
})
export class SettingModule { }
