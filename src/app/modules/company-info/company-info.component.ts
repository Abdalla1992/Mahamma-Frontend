import { AddEditWorkspaceComponent } from './../workspace/add-edit-workspace/add-edit-workspace.component';
import { CompanyService } from '../../@AppService/services/company.service';
import { CompanyModel } from './../../@AppService/models/auth.model';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
import { User } from 'src/app/@core/auth/app-user';
import { UserProfileStatuses } from 'src/app/@AppService/Enums/userProfileStatus';
import { CreateFirstWorkspaceComponent } from '../workspace/create-first-workspace/create-first-workspace.component';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
})
export class CompanyInfoComponent extends BaseComponent implements OnInit {
  companyFormGroup: FormGroup;
  fieldTextType: boolean;
  companyModel: CompanyModel;
  private modalService: NgbModal;
  @ViewChild('focus') private elementRef: ElementRef;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private companyService: CompanyService,
    private authentedService: AuthenticationService
  ) {
    super();
    const injector = AppInjector.getInjector();
    this.modalService = injector.get(NgbModal);
  }

  ngOnInit(): void {
    this.companyModel = this.emptyEntity();
    this.loadForm();
  }

  public ngAfterViewInit(): void {
    (this.elementRef.nativeElement as HTMLInputElement).focus()
  }

  loadForm(): void {
    this.companyFormGroup = this.fb.group({
      name: [
        this.companyModel.name,
        Validators.compose([Validators.required]),
      ],
      member: [this.companyModel.member],
    });
  }

  emptyEntity(): CompanyModel {
    return {
      id: 0,
      name: '',
      descreption: '',
      companySize: '',
      member: '',
      invitationsEmails: [],
      activationStatus: '',
    };
  }

  createCompany() {
    this.submitted = true;
    if (this.companyFormGroup.invalid) {
      return;
    }

    const companyModel: CompanyModel = this.companyFormGroup.value;
    companyModel.invitationsEmails = this.companyModel.invitationsEmails;
    companyModel.companySize = this.companyModel.companySize;
    this.companyService.createCompany(companyModel).subscribe(
      (createCompanyResponse) => {
        if (
          createCompanyResponse.isValidResponse &&
          createCompanyResponse.result.responseData > 0
        ) {
          let currentUser: User = this.authentedService.currentUser();
          this.authentedService.login(
            currentUser.id,
            currentUser.fullName,
            currentUser.jobTitle,
            currentUser.profileImage,
            currentUser.userName,
            currentUser.email,
            currentUser.phoneNumber,
            currentUser.workingDays,
            currentUser.workingHours,
            createCompanyResponse.result.responseData,
            this.authentedService.currentUserToken,
            UserProfileStatuses.CompanyCreated,
            currentUser.roleId,
            currentUser.languageId,
            currentUser.bio,
            currentUser.skills
          );

          this.modal.close();
          this.openNextModal(CreateFirstWorkspaceComponent);
        } else {
          this.showErrorMessage(createCompanyResponse.result.commandMessage);
        }
      },
      (err) => {
        this.errorOccured(err);
      }
    );
  }
  addEmailToInvitationList() {
    let emails = this.companyFormGroup.get('member')?.value.split(',');
    this.companyModel.invitationsEmails =
      this.companyModel.invitationsEmails.concat(emails);
    this.companyFormGroup.get('member')?.setValue('');
  }

  remove(email){
    console.log(email);
   this.companyModel.invitationsEmails =  this.companyModel.invitationsEmails.filter(e => e!==email);
   console.log(this.companyModel.invitationsEmails);
  }

  setCompanySize(companySize: string) {
//    this.selectOp2 = ! this.selectOp2
    this.selectNum = !this.selectNum
    this.companyModel.companySize = companySize;
  }

  openNextModal(madalComponentName: any) {
    const modalRef = this.modalService.open(madalComponentName, {
      // size: 'xl',
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.id = 0;
    modalRef.result.then(() => { });
  }
  option1: string = 'Just me';
  option2: string = '2-5';
  option3: string = '6-20';
  option4: string = '21-50';
  option5: string = '51-200';
  option6: string = "I don't know";
  selectNum: boolean = true;
  selectOp2: boolean = false;

  status = false;
}
