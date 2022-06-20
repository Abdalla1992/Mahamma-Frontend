import { ContactUsComponent } from './../../contact-us/contact-us.component';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { CreateAccComponent } from './../../create-acc/create-acc.component';
import { User } from 'src/app/@core/auth/app-user';
import { Component, Input, OnInit } from '@angular/core';
import { LoginComponent } from '../../login/login.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/@AppService/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
import { LanguageDto } from 'src/app/@AppService/models/common/language-dto';
import { LanguageService } from 'src/app/@AppService/services/language.service';
import { LanguageHandler } from 'src/app/@core/language/language-handler';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { UserProfileSetting } from 'src/app/@AppService/models/user-profile-setting.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent extends BaseComponent implements OnInit {
  @Input() invitationId: string;
  languages: LanguageDto[];
  currentUser: User;
  formGroup: FormGroup;
  userProfileSetting: UserProfileSetting;


  private modalService: NgbModal;
  constructor(
    private languageService: LanguageService,
    private languageHandler: LanguageHandler,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    super();
    const injector = AppInjector.getInjector();
    this.modalService = injector.get(NgbModal);
  }
  ngOnInit() {
    if (this.invitationId && this.invitationId.length > 0) {
      this.openCreateAccount();
    }
    this.getAllLanguages();
    this.currentUser = this.authenticationService.currentUser();
    this.loadForm();
    this.userProfileSetting = this.emptyProfileSetting();
  }

  openLogin() {
    this.openNextModal(LoginComponent);
  }

  openCreateAccount() {
    this.openNextModal(CreateAccComponent);
  }

  openContatctUs() {
    this.openNextModal(ContactUsComponent)
  }

  openNextModal(madalComponentName: any) {
    const modalRef = this.modalService.open(madalComponentName, {
      //size: 'xl',
      modalDialogClass: 'crud-process',
    });
    if (madalComponentName == CreateAccComponent)
      modalRef.componentInstance.invitationId = this.invitationId;
    modalRef.result.then(() => {});
  }

  loadForm(): void {
    this.formGroup = this.fb.group({
      languageId: [
        this.currentUser.languageId
      ],
    });
  }
  getAllLanguages() {
    this.languageService.getAllLanguages().subscribe((response) => {
      if (response.isValidResponse) {
        this.languages = response.result.responseData;
        // if(response.result.responseData){
        //   this.currentUser = this.authenticationService.currentUser();
        //     let lang: LanguageDto = this.languages.find(
        //       (l) => l.id == this.currentUser.languageId
        //     )!;
        //     this.languageHandler.Setlanguage(lang);
        //     this.languageHandler.changeLanguge(lang);
        // }
       }
    });
  }
   save(){
    this.userService
    .updateUserProfileSettings(this.userProfileSetting)
    .subscribe((response) => {
      if (response.isValidResponse) {
        if (response.result.responseData) {
          this.showSuccessMessage(response.result.commandMessage);
          this.currentUser = this.authenticationService.currentUser();
          let lang: LanguageDto = this.languages.find(
            (l) => l.id == this.currentUser.languageId
          )!;
          this.languageHandler.Setlanguage(lang);
          this.languageHandler.changeLanguge(lang);
        } else {
          this.showErrorMessage(response.result.commandMessage);
        }
      } else {
        this.showErrorMessages(response.errors);
      }
    });
   }
   prepareProfileSetting() {
    const formData = this.formGroup.value;
    this.userProfileSetting.languageId = formData.languageId;
  }
  emptyProfileSetting(): UserProfileSetting {
    return {
      bio: '',
      currentPassword: '',
      email: '',
      fullName: '',
      jobTitle: '',
      languageId: 0,
      newPassword: '',
      profileImage: '',
      skills: [],
    };
  }
}
