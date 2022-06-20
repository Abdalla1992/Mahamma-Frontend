import { ViewDocumentComponent } from './view.documents/view.documents.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './document.component';
import { ViewFolderComponent } from './view-folder/view-folder.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentComponent,

    children: [
      {
        path: 'view-all-files',
        component: ViewDocumentComponent,
      },
      {
        path: 'view-folder-files',
        component: ViewFolderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentRoutingModule {}
