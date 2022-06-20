import { UserProfileSetting } from './../../../@AppService/models/user-profile-setting.model';
import { LanguageDto } from './../../../@AppService/models/common/language-dto';
import { LanguageHandler } from './../../../@core/language/language-handler';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { User } from 'src/app/@core/auth/app-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/@AppService/services/language.service';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { FileInfo } from 'src/app/@AppService/models/common.model';
import { UserService } from 'src/app/@AppService/services/user.service';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.scss'],
})
export class GeneralSettingComponent extends BaseComponent implements OnInit {
  languages: LanguageDto[];
  webImageInfo: FileInfo = {
    fileUrl: '',
    fileExtention: '',
    fileName: '',
    fileSize: '',
  };
  private webFile: File;
  imageUrl: string;
  formGroup: FormGroup;
  currentUser: User;
  currentPassword: string;
  confirmPassword: string;
  skills: string[];
  newSkill: string;
  userProfileSetting: UserProfileSetting;

  constructor(
    private languageService: LanguageService,
    private languageHandler: LanguageHandler,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    //private authService: AuthService,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllLanguages();
    this.currentUser = this.authenticationService.currentUser();
    this.skills = this.currentUser.skills?.split(',');
    this.imageUrl = this.currentUser.profileImage;
    this.loadForm();
    this.userProfileSetting = this.emptyProfileSetting();
  }
  loadForm(): void {
    this.formGroup = this.fb.group({
      profileImage: [
        this.currentUser?.profileImage,
      ],
      fullName: [
        this.currentUser.fullName,
        Validators.compose([Validators.required]),
      ],
      email: [
        this.currentUser.email,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            new RegExp(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          ),
        ]),
      ],
      jobTitle: [
        this.currentUser.jobTitle,
        Validators.compose([Validators.required]),
      ],
      password: [
        this.currentPassword,
      ],
      confirmPassword: [
        this.confirmPassword,
      ],
      bio: [
        this.currentUser.bio
      ],
      languageId: [
        this.currentUser.languageId
      ],
      newSkill: [this.newSkill],
    });
  }

  getAllLanguages() {
    this.languageService.getAllLanguages().subscribe((response) => {
      if (response.isValidResponse) {
        this.languages = response.result.responseData;
      }
    });
  }

  processWebDataFile(webFileInput: any) {
    this.webFile = webFileInput.files[0];
    if (this.webFile) {
      this.webImageInfo.fileName = this.webFile.name;
      this.webImageInfo.fileExtention = this.webFile.type;
      const size = this.webFile.size / Math.log(1024);
      this.webImageInfo.fileSize = Math.round(size).toString() + ' KB';

      this.authService.uploadProfileImage(this.webFile).subscribe(
        (event) => {
          if (event) {
            this.formGroup.controls.profileImage.setValue(event.fileUrl);
            this.imageUrl = event.fileUrl;
          }
        },
        (err) => {
          //this.errorOccured(err);
        }
      );
    }
  }
  addSkill(skillName: string) {
    if (!this.skills) {
      this.skills = [];
    }
    if (skillName && skillName.length > 0) this.skills.push(skillName);
    this.formGroup.get('newSkill')?.setValue('');
  }
  save() {
    this.prepareProfileSetting();
    this.userService
      .updateUserProfileSettings(this.userProfileSetting)
      .subscribe((response) => {
        if (response.isValidResponse) {
          if (response.result.responseData) {
            this.showSuccessMessage(response.result.commandMessage);
            this.authenticationService.login(
              this.currentUser.id,
              this.userProfileSetting.fullName,
              this.userProfileSetting.jobTitle,
              this.userProfileSetting.profileImage,
              this.userProfileSetting.email,
              this.userProfileSetting.email,
              this.currentUser.phoneNumber,
              this.currentUser.workingDays,
              this.currentUser.workingHours,
              this.currentUser.companyId,
              this.authenticationService.currentUserToken,
              this.currentUser.userProfileStatusId,
              this.currentUser.roleId,
              this.userProfileSetting.languageId,
              this.userProfileSetting.bio,
              this.userProfileSetting.skills ? this.userProfileSetting.skills.join(',') : ''
            );
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
    this.userProfileSetting.profileImage = formData.profileImage;
    this.userProfileSetting.fullName = formData.fullName;
    this.userProfileSetting.bio = formData.bio;
    this.userProfileSetting.currentPassword = formData.password;
    this.userProfileSetting.newPassword = formData.confirmPassword;
    this.userProfileSetting.languageId = formData.languageId;
    this.userProfileSetting.email = formData.email;
    this.userProfileSetting.jobTitle = formData.jobTitle;
    this.userProfileSetting.skills = this.skills;
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
