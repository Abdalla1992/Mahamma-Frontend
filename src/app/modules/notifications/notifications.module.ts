import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsMenuComponent } from './notifications-menu/notifications-menu.component';
import { NotificationsDescComponent } from './notifications-desc/notifications-desc.component';
import { NotificationsCommentsComponent } from './notifications-comments/notifications-comments.component';
import { SharedModule } from 'src/app/Page/shared.module';
import { NotificationsComponent } from './notifications.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsTitleComponent } from './notifications-title/notifications-title.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DynamicLoaderModule } from '../shared/dynamic-loader/dynamic-loader-module';
import { TaskModule } from '../task/task.module';
import { NotifictationComponentDictionary } from './notification-component-dictionary';
import { DynamicLoaderComponentsDictionary } from '../shared/dynamic-loader/contracts/dynamic-loader-component-dictionary';


@NgModule({
  declarations: [
    NotificationsMenuComponent,
    NotificationsDescComponent,
    NotificationsCommentsComponent,
    NotificationsComponent,
    NotificationsTitleComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    SharedModule,
    NgbModule,
    NgxDropzoneModule,
    TranslateModule.forChild({
      defaultLanguage: "EN",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    DynamicLoaderModule,
    TaskModule
  ],
  providers : [
    { provide: DynamicLoaderComponentsDictionary, useClass: NotifictationComponentDictionary },
  ]
})
export class NotificationsModule { }
