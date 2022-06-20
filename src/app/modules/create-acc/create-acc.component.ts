import { CompanyInvitation } from './../../@AppService/models/company-invitation.model';
import { CompanyService } from './../../@AppService/services/company.service';
import { LoginUser, NewUser } from 'src/app/@AppService/models/auth.model';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/@AppService/models/user.model';
import { UserService } from 'src/app/@AppService/services/user.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { UserProfileStatuses } from 'src/app/@AppService/Enums/userProfileStatus';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
import { CompleteProfileComponent } from '../complete-profile/complete-profile.component';
import { isThisTypeNode } from 'typescript';
import { InvitationStatuses } from 'src/app/@AppService/Enums/invitation-status';
import { LoginComponent } from '../login/login.component';
import { GoogleLoginService } from 'src/app/@AppService/services/login/google.login.service';
import { MemberModel } from 'src/app/@AppService/models/search.member.model';
import { CompanyInfoComponent } from '../company-info/company-info.component';
import { CreateFirstWorkspaceComponent } from '../workspace/create-first-workspace/create-first-workspace.component';
import { LanguageDto } from 'src/app/@AppService/models/common/language-dto';
import { LanguageService } from 'src/app/@AppService/services/language.service';
import { LanguageHandler } from 'src/app/@core/language/language-handler';

@Component({
  selector: 'app-create-acc',
  templateUrl: './create-acc.component.html',
  styleUrls: ['./create-acc.component.scss'],
})
export class CreateAccComponent extends BaseComponent implements OnInit {
  newAccountFormGroup: FormGroup;
  fieldTextType: boolean;
  newAccount: NewUser;
  companyInvitation: CompanyInvitation;
  returnUrl: string;
  languageDto: LanguageDto;

  @Input() invitationId: string;
  private modalService: NgbModal;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  constructor(
    private fb: FormBuilder,
    private googleLoginService: GoogleLoginService,
    private authentedService: AuthenticationService,
    private companySerice: CompanyService,
    public modal: NgbActiveModal,
    private languageService: LanguageService,
    private languageHandler: LanguageHandler
  ) {
    super();
    const injector = AppInjector.getInjector();
    this.modalService = injector.get(NgbModal);
    this.returnUrl = this.baseActivatedRoute.snapshot.queryParams.returnUrl || '/dashboard/';
  }

  ngOnInit(): void {
    if (this.invitationId && this.invitationId.length > 0) {
      this.companySerice
        .getCompanyInvitation(this.invitationId)
        .subscribe((response) => {
          if (response.result.responseData) {
            if (
              response.result.responseData.invitationStatusId ==
              InvitationStatuses.Opened
            ) {
              this.modal.close();
              return;
            }
            this.companyInvitation = response.result.responseData;
          } else {
            this.showErrorMessage(response.result.commandMessage);
          }
          this.newAccount = this.emptyEntity();
          this.loadForm();
        });
    } else {
      this.newAccount = this.emptyEntity();
      this.loadForm();
    }
  }

  onSignIn() {
    var localInvitationId: string = this.companyInvitation ? this.companyInvitation.invitationId : '';
    this.googleLoginService.loginForUser(localInvitationId).then((result) => {
      if (result[0].isValidResponse) {
        if (result[0].result.responseData) {
          this.authentedService.login(
            result[0].result.responseData.id,
            result[0].result.responseData.fullName,
            result[0].result.responseData.jobTitle,
            result[0].result.responseData.profileImage,
            result[0].result.responseData.userName,
            result[0].result.responseData.email,
            result[0].result.responseData.phoneNumber,
            result[0].result.responseData.workingDays,
            result[0].result.responseData.workingHours,
            result[0].result.responseData.companyId,
            result[0].result.responseData.authToken,
            result[0].result.responseData.userProfileStatusId,
            result[0].result.responseData.roleId,
            result[0].result.responseData.languageId,
            result[0].result.responseData.bio,
            result[0].result.responseData.skills
          );
          this.getCurrentUserLanguage(result[0].result.responseData.languageId);
          this.handleUserProfileStatusResponse(
            result[0].result.responseData.userProfileStatusId,
            result[1]
          );
        } else {
          this.showErrorMessage(result[0].result.commandMessage);
        }
      } else {
        this.showErrorMessages(result[0].errors);
      }
    });
  }

  loadForm(): void {
    if (this.companyInvitation) {
      this.newAccount.email = this.companyInvitation.email;
    }
    this.newAccountFormGroup = this.fb.group({
      email: [
        this.newAccount.email,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            new RegExp(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          ),
        ]),
      ],
      password: [
        this.newAccount.password,
        Validators.compose([Validators.required, Validators.minLength(8),
        Validators.pattern(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/))]),
      ],
      confirmPassword: [
        this.newAccount.confirmpassword,
        Validators.compose([Validators.required, this.validateAreEqual.bind(this)]),
      ],
    });
  }
  private validateAreEqual(fieldControl: FormControl) {
    return fieldControl.value === this.newAccountFormGroup?.get("password")?.value ? null : {
      notEqual: true
    };
  }
  emptyEntity(): NewUser {
    return {
      email: '',
      password: '',
      confirmpassword: '',
      invitationId: '',
    };
  }

  createAccount() {
    this.submitted = true;
    if (this.newAccountFormGroup.invalid) {
      return;
    }

    const newAccount: NewUser = this.newAccountFormGroup.value;
    if (this.companyInvitation) {
      newAccount.invitationId = this.companyInvitation.invitationId;
    }

    this.authService.createAccount(newAccount).subscribe(
      (createAccResponse) => {
        if (createAccResponse.isValidResponse) {
          if (createAccResponse.result.responseData) {
            this.authentedService.login(
              createAccResponse.result.responseData.id,
              createAccResponse.result.responseData.fullName,
              createAccResponse.result.responseData.jobTitle,
              createAccResponse.result.responseData.profileImage,
              createAccResponse.result.responseData.userName,
              createAccResponse.result.responseData.email,
              createAccResponse.result.responseData.phoneNumber,
              createAccResponse.result.responseData.workingDays,
              createAccResponse.result.responseData.workingHours,
              createAccResponse.result.responseData.companyId,
              createAccResponse.result.responseData.authToken,
              createAccResponse.result.responseData.userProfileStatusId,
              createAccResponse.result.responseData.roleId,
              createAccResponse.result.responseData.languageId,
              createAccResponse.result.responseData.bio,
              createAccResponse.result.responseData.skills
            );
            if (
              createAccResponse.result.responseData.userProfileStatusId ==
              UserProfileStatuses.Registered
            ) {
              this.modal.close();
              this.openNextModal(CompleteProfileComponent);
            }
          }
          else {
            this.showErrorMessage(createAccResponse.result.commandMessage);
          }
        } else {
          this.showErrorMessages(createAccResponse.errors);
        }
      },
      (err) => {
        this.errorOccured(err);
      }
    );
  }

  openNextModal(madalComponentName: any, inputs?: [string, any]) {
    const modalRef = this.modalService.open(madalComponentName, {
      //size: 'xl',
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.id = 0;
    modalRef.componentInstance.invitationId = this.invitationId;
    if (inputs) modalRef.componentInstance[inputs[0]] = inputs[1];
    modalRef.result.then(() => { });
  }

  // statusSelect = 'not-active';

  // setActiveClass(){
  //   this.statusSelect = 'active';
  // }
  openLogin() {
    this.modal.close();
    this.openNextModal(LoginComponent);
  }

  handleUserProfileStatusResponse(
    userProfileStatus: number,
    userData?: MemberModel
  ) {
    this.modal.close();
    if (userProfileStatus == UserProfileStatuses.Registered) {
      if (userData)
        this.openNextModal(CompleteProfileComponent, ['userData', userData]);
      else this.openNextModal(CompleteProfileComponent);
    } else if (userProfileStatus == UserProfileStatuses.ProfileCompleted) {
      this.openNextModal(CompanyInfoComponent);
    } else if (userProfileStatus == UserProfileStatuses.CompanyCreated) {
      this.openNextModal(CreateFirstWorkspaceComponent);
    } else if (userProfileStatus == UserProfileStatuses.FirstWorkspaceCreated) {
      this.navigateToUrl(this.returnUrl);
    }
  }

  getCurrentUserLanguage(id: number) {
    this.languageService.getLanguage(id).subscribe((response) => {
      this.languageDto = response.result.responseData;
      this.languageHandler.Setlanguage(this.languageDto);
      this.languageHandler.changeLanguge(this.languageDto);
    });
  }
}
