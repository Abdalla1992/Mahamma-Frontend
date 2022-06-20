import { LanguageHandler } from './../../@core/language/language-handler';
import { LanguageDto } from './../../@AppService/models/common/language-dto';
import { CompanyInfoComponent } from './../company-info/company-info.component';
import { CompleteProfileComponent } from './../complete-profile/complete-profile.component';
import { AddEditWorkspaceComponent } from './../workspace/add-edit-workspace/add-edit-workspace.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileStatuses } from 'src/app/@AppService/Enums/userProfileStatus';
import { LoginUser } from 'src/app/@AppService/models/auth.model';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
import { GoogleLoginService } from 'src/app/@AppService/services/login/google.login.service';
import { Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { MemberModel } from 'src/app/@AppService/models/search.member.model';
import { LanguageService } from 'src/app/@AppService/services/language.service';
import { CreateAccComponent } from '../create-acc/create-acc.component';
import { ListWorkspaceComponent } from '../workspace/list-workspace/list-workspace.component';
import { PasswordRecoveryComponent } from '../password-recovery/password-recovery.component';
import { CreateFirstWorkspaceComponent } from '../workspace/create-first-workspace/create-first-workspace.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginFormGroup: FormGroup;
  fieldTextType: boolean;
  loginUser: LoginUser;
  returnUrl: string;
  private modalService: NgbModal;
  languageDto: LanguageDto;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  constructor(
    private fb: FormBuilder,
    private googleLoginService: GoogleLoginService,
    private authentedService: AuthenticationService,
    public modal: NgbActiveModal,
    private metService: Meta,
    private languageService: LanguageService,
    private languageHandler: LanguageHandler
  ) {
    super();
    const injector = AppInjector.getInjector();
    this.modalService = injector.get(NgbModal);
  }

  ngOnInit(): void {
    this.addGoogleheadersAndScripts();

    this.loginUser = this.emptyEntity();
    this.loadLoginForm();
    this.returnUrl = this.baseActivatedRoute.snapshot.queryParams.returnUrl || '/dashboard/';
  }

  onSignIn() {
    this.googleLoginService.loginForUser('').then((result) => {
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

  loadLoginForm(): void {
    this.loginFormGroup = this.fb.group({
      email: [
        this.loginUser.email,
        Validators.compose([Validators.required,
        Validators.pattern(
          new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        )]),
      ],
      password: [
        this.loginUser.password,
        Validators.compose([Validators.required, Validators.minLength(8),
          Validators.pattern(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/))]),
      ],
    });
  }
  emptyEntity(): LoginUser {
    return {
      email: '',
      password: '',
    };
  }
  login() {
    this.submitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }

    const loginInfo: LoginUser = this.loginFormGroup.value;

    this.authService.login(loginInfo).subscribe(
      (loginResponse) => {
        if (loginResponse.isValidResponse) {
          if (loginResponse.result.responseData) {
            this.authentedService.login(
              loginResponse.result.responseData.id,
              loginResponse.result.responseData.fullName,
              loginResponse.result.responseData.jobTitle,
              loginResponse.result.responseData.profileImage,
              loginResponse.result.responseData.userName,
              loginResponse.result.responseData.email,
              loginResponse.result.responseData.phoneNumber,
              loginResponse.result.responseData.workingDays,
              loginResponse.result.responseData.workingHours,
              loginResponse.result.responseData.companyId,
              loginResponse.result.responseData.authToken,
              loginResponse.result.responseData.userProfileStatusId,
              loginResponse.result.responseData.roleId,
              loginResponse.result.responseData.languageId,
              loginResponse.result.responseData.bio,
              loginResponse.result.responseData.skills
            );
            this.getCurrentUserLanguage(loginResponse.result.responseData.languageId);
            this.handleUserProfileStatusResponse(loginResponse.result.responseData.userProfileStatusId);
          } else {
            this.showErrorMessage(loginResponse.result.commandMessage);
          }
        } else {
          this.showErrorMessages(loginResponse.errors);
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
    if (inputs) modalRef.componentInstance[inputs[0]] = inputs[1];
    modalRef.result.then(() => { });
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

  addGoogleheadersAndScripts() {
    this.metService.addTag({
      name: 'google-signin-client_id',
      content: environment.googleClientId,
    });
  }
  getCurrentUserLanguage(id: number) {
    this.languageService.getLanguage(id).subscribe((response) => {
      this.languageDto = response.result.responseData;
      this.languageHandler.Setlanguage(this.languageDto);
      this.languageHandler.changeLanguge(this.languageDto);
    });
  }
  openCreateAccount() {
    this.modal.close();
    this.openNextModal(CreateAccComponent);
  }

  openForgetPasswordComponent() {
    this.modal.close();
    const modalRef = this.modalService.open(PasswordRecoveryComponent, {
      //size: 'xl',
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.id = 0;
    modalRef.result.then(() => { });
  }

}
