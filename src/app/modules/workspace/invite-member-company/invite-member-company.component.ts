import { CompanyService } from 'src/app/@AppService/services/company.service';
import { CompanyInvitation } from './../../../@AppService/models/company-invitation.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileContent } from 'src/app/@AppService/models/file-content.model';
import { LoadingService } from 'src/app/@core/Component/loader-component/loader.service';

@Component({
  selector: 'app-invite-member-company',
  templateUrl: './invite-member-company.component.html',
  styleUrls: ['./invite-member-company.component.scss'],
})
export class InviteMemberCompanyComponent
  extends BaseComponent
  implements OnInit
{
  formGroup: FormGroup;
  companyInvitation: CompanyInvitation;
  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private companyService: CompanyService

  ) {
    super();
  }

  ngOnInit(): void {
    this.companyInvitation = {
      id: 0,
      email: '',
      invitationId: '',
      invitationLink: '',
      companyId: 0,
      invitationStatusId: 0,
      userId: 0,
      activationStatus: '',
    };
    this.loadForm();
    this.companyService.createCompanyInvitation().subscribe((response) => {
      if (response.isValidResponse) {
        this.companyInvitation = response.result.responseData;
      }
    });
  }
  loadForm(): void {
    this.formGroup = this.fb.group({
      email: [
        this.companyInvitation.email,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            new RegExp(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          ),
        ]),
      ],
    });
  }


  copyInvitationLink(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
  save() {
    const formData = this.formGroup.value;
    this.companyInvitation.email = formData.email;
    this.companyService
      .setEmailToCompanyInvitation(this.companyInvitation)
      .subscribe((response) => {
        this.modal.close();
        if (response.isValidResponse) {
          this.showSuccessMessage(response.result.commandMessage);
        } else {
          this.showErrorMessages(response.errors);
        }
      });
  }

  handleUploadedFiles(uploadedFiles: any){
    this.showSuccessMessage("uplaoding process is running in background!");
    this.companyService.sendInvitationsFromFile(uploadedFiles).subscribe(
      res => {
        if(res.result.responseData){
          this.showSuccessMessage(res.result.commandMessage);
          this.modal.close();
        }
        else{
          this.showErrorMessage(res.result.commandMessage);
        }
      },
      error => this.showErrorMessages(error.error.errors)
    );
  }
}
