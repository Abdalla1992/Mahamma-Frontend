import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { createTranslateLoader } from 'src/app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/Page/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { MeetingListComponent } from './meeting-list/meeting-list.component';

@NgModule({
  declarations: [
    MeetingListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild({
      defaultLanguage: "EN",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    FormsModule,
    MatExpansionModule,
    ReactiveFormsModule,
  ],
  exports: [
    MeetingListComponent,
  ],

})
export class MeetingModuleShared { }