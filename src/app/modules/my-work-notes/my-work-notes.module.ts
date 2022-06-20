import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyWorkNotesRoutingModule } from './my-work-notes-routing.module';
import { createTranslateLoader } from 'src/app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { TaskModule } from '../task/task.module';
import { MatSliderModule } from '@angular/material/slider';
import { IgxProgressBarModule } from 'igniteui-angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MyWorkNotesHeaderComponent } from './my-work-notes-header/my-work-notes-header.component';
import { MyWorkNotesSectionComponent } from './my-work-notes-section/my-work-notes-section.component';
import { MyWorkNotesActivitiesComponent } from './my-work-notes-activities/my-work-notes-activities.component';
import { MyWorkAddNewNoteComponent } from './my-work-add-new-note/my-work-add-new-note.component';
import { SharedModule } from 'src/app/Page/shared.module';
import { MyWorkNotesComponent } from './my-work-notes.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MyWorkService } from 'src/app/@AppService/services/my-work.service';

@NgModule({
  declarations: [
    MyWorkNotesHeaderComponent,
    MyWorkNotesSectionComponent,
    MyWorkNotesActivitiesComponent,
    MyWorkAddNewNoteComponent,
    MyWorkNotesComponent
  ],
  imports: [
    CommonModule,
    MyWorkNotesRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      defaultLanguage: "EN",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    FormsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatSliderModule,
    IgxProgressBarModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    TaskModule,
    CarouselModule
  ],
  exports: [],
  providers: [
    MyWorkService
  ]
})
export class MyWorkNotesModule { }
