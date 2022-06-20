import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { AddEditWorkspaceComponent } from './add-edit-workspace/add-edit-workspace.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListWorkspaceComponent } from './list-workspace/list-workspace.component';
import { SharedModule } from 'src/app/Page/shared.module';
import { WorkspaceProfileComponent } from './workspace-profile/workspace-profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CompanyMembersComponent } from './company-members/company-members.component';
import { InviteMemberCompanyComponent } from './invite-member-company/invite-member-company.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { CreateFirstWorkspaceComponent } from './create-first-workspace/create-first-workspace.component';
import { DocumentModule } from '../document/document.module';

@NgModule({
  declarations: [
    WorkspaceComponent,
    AddEditWorkspaceComponent,
    ListWorkspaceComponent,
    WorkspaceProfileComponent,
    CompanyMembersComponent,
    InviteMemberCompanyComponent,
    CreateFirstWorkspaceComponent
   ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    SharedModule,
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
    ToastrModule.forRoot(),
    DocumentModule
  ],
})
export class WorkspaceModule {}
