import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { SharedModule } from 'src/app/Page/shared.module';
import { DocumentComponent } from './document.component';
import { UploadDocumentComponent } from './upload-document/upload.document.component';
import { ViewDocumentComponent } from './view.documents/view.documents.component';
import { DocumentRoutingModule } from './document-routing.module';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DocumentNameComponent } from './document-name/document-name.component';
import { MatMenuModule } from '@angular/material/menu';
import { MoveDocumentComponent } from './move-document/move-document.component';
import { ViewFolderComponent } from './view-folder/view-folder.component';

@NgModule({
  declarations: [
    DocumentComponent,
    ViewDocumentComponent,
    UploadDocumentComponent,
    DocumentNameComponent,
    MoveDocumentComponent,
    ViewFolderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    DocumentRoutingModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      defaultLanguage: "EN",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatMenuModule
  ],
  exports : [ UploadDocumentComponent ],
  providers : []
})
export class DocumentModule { }
