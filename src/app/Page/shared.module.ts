import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MyWorkComponent } from './my-work/my-work.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyInfoComponent } from './my-info/my-info.component';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { CalenderComponent } from './calender/calender.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);


@NgModule({
  declarations: [
    SideNavComponent,
    MyWorkComponent,
    MyInfoComponent,
    CalenderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    RouterModule,
    TranslateModule.forChild({
      defaultLanguage: "EN",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]

      }
    }),
    NgxDropzoneModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ToastrModule.forRoot(),
    FullCalendarModule
  ],
  exports: [
    SideNavComponent,
    MyWorkComponent,
    MyInfoComponent,
    TranslateModule,
    NgxDropzoneModule,
    CalenderComponent
  ],
  providers:[]
})
export class SharedModule { }
