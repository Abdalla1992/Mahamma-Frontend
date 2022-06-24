import { SubTaskModule } from './modules/subtask/sub-task.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { LoginComponent } from './modules/login/login.component';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmationComponent } from './@core/Component/confirmation/confirmation/confirmation.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInjector } from './@core/Injector/app-injectore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { WorkspaceModule } from './modules/workspace/workspace.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { CreateAccComponent } from './modules/create-acc/create-acc.component';
import { CompleteProfileComponent } from './modules/complete-profile/complete-profile.component';
import { PasswordRecoveryComponent } from './modules/password-recovery/password-recovery.component';
import { CreateNewPasswordComponent } from './modules/create-new-password/create-new-password.component';
import { DocumentModule } from './modules/document/document.module';

import { CompanyInfoComponent } from './modules/company-info/company-info.component';
import { JwtInterceptor } from './@core/interceptor/jwt.interceptor';

import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoaderComponent } from './@core/Component/loader-component/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderInterceptor } from './@core/interceptor/Loader.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { NotificationsModule } from './modules/notifications/notifications.module';
import { HomeModule } from './modules/home/home.module';
import { MeetingModule } from './modules/meeting/meeting.module';
import { MyWorkNotesModule } from './modules/my-work-notes/my-work-notes.module';
import { ContactUsComponent } from './modules/contact-us/contact-us.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    ConfirmationComponent,
    CreateAccComponent,
    LoginComponent,
    CompleteProfileComponent,
    PasswordRecoveryComponent,
    CreateNewPasswordComponent,
    CompanyInfoComponent,
    LoaderComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    WorkspaceModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectModule,
    WorkspaceModule,
    NgxDropzoneModule,
    TaskModule,
    SubTaskModule,
    HomeModule,
    FormsModule,
    DashboardModule,
    DocumentModule,
    NgxSpinnerModule,
    NotificationsModule,
    MatProgressSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      }
    }),
    ToastrModule.forRoot(),
    MeetingModule,
    BrowserAnimationsModule ,
    MyWorkNotesModule,
    
  ],
  providers: [
    NgbActiveModal,
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    AppInjector.setInjector(injector);
  }
}
