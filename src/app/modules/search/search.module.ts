import { DocumentModule } from '../document/document.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { SearchRoutingModule } from './search-routing.module';
import { SharedModule } from 'src/app/Page/shared.module';
import { SearchWorkspaceListComponent } from './search-workspace-list/search-workspace-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatSliderModule } from '@angular/material/slider';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SearchComponent } from './search.component';
import { SearchTaskListComponent } from './search-task-list/search-task-list.component';
import { SearchMemberListComponent } from './search-member-list/search-member-list.component';
import { SearchProjectListComponent } from './search-project-list/search-project-list.component';
import { TaskModule } from '../task/task.module';


@NgModule({
  declarations: [
    SearchWorkspaceListComponent,
    SearchProjectListComponent,
    SearchMemberListComponent,
    SearchTaskListComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    NgxDropzoneModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatCardModule,
    MatProgressBarModule,
    TranslateModule.forChild({
      defaultLanguage: "EN",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    DocumentModule,
    ReactiveFormsModule,
    MatSliderModule,
    TaskModule
  ],
  exports: [],
  providers: [
    DatePipe
  ]
})
export class SearchModule { }
