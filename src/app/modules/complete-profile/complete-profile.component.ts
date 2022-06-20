import { CompanyInfoComponent } from './../company-info/company-info.component';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NgbActiveModal,
  NgbCarouselConfig,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { CompeleteUserProfile } from 'src/app/@AppService/models/auth.model';
import { FileInfo } from 'src/app/@AppService/models/common.model';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { User } from 'src/app/@core/auth/app-user';
import { UserProfileStatuses } from 'src/app/@AppService/Enums/userProfileStatus';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
import { MemberModel } from 'src/app/@AppService/models/search.member.model';

@Component({
  selector: 'app-create-company',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss'],
})
export class CompleteProfileComponent extends BaseComponent implements OnInit {
  @Input() invitationId: string;
  @Input() userData: MemberModel;
  returnUrl: string;
  webImageInfo: FileInfo = {
    fileUrl: '',
    fileExtention: '',
    fileName: '',
    fileSize: '',
  };
  compeleteProfileFormGroup: FormGroup;
  private webFile: File;
  compeleteUserProfile: CompeleteUserProfile;
  imageUrl: string;
  private modalService: NgbModal;

  constructor(
    private fb: FormBuilder,
    private authentedService: AuthenticationService,
    public modal: NgbActiveModal,

    config: NgbCarouselConfig
  ) {
    super();
    const injector = AppInjector.getInjector();
    this.modalService = injector.get(NgbModal);
    config.interval = 0;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.compeleteUserProfile = this.emptyEntity();
    this.loadForm();
    this.imageUrl = this.userData?.profileImage;

    this.returnUrl =
      this.baseActivatedRoute.snapshot.queryParams.returnUrl ||
      '/workspace/workspace-list';
  }

  loadForm(): void {
    this.compeleteProfileFormGroup = this.fb.group({
      profileImage: [

        this.userData?.profileImage ?? this.compeleteUserProfile.profileImage
      ],
      fullName: [
        this.userData?.fullName ?? this.compeleteUserProfile.fullName,
        Validators.compose([Validators.required]),
      ],
      jobTitle: [
        this.compeleteUserProfile.jobTitle,
        Validators.compose([Validators.required]),
      ],
      workingDays: [
        this.compeleteUserProfile.workingDays
      ],
      workingHours: [
        this.compeleteUserProfile.workingHours
      ],
    });
  }

  emptyEntity(): CompeleteUserProfile {
    return {
      fullName: '',
      profileImage: '',
      jobTitle: '',
      workingDays: 0,
      workingHours: 0,
      invitationId: '',
    };
  }
  // onFileChanged(event) {
  //   const file = event.target.files[0];
  // }
  processWebDataFile(webFileInput: any) {
    this.webFile = webFileInput.files[0];
    if (this.webFile) {
      //this.imageRemoved = false;
      this.webImageInfo.fileName = this.webFile.name;
      this.webImageInfo.fileExtention = this.webFile.type;
      const size = this.webFile.size / Math.log(1024);
      this.webImageInfo.fileSize = Math.round(size).toString() + ' KB';

      this.authService.uploadProfileImage(this.webFile).subscribe(
        (event) => {
          if (event) {
            this.compeleteProfileFormGroup.controls.profileImage.setValue(
              event.fileUrl
            );
            this.imageUrl = event.fileUrl;
          }
        },
        (err) => {
          this.errorOccured(err);
        }
      );
    }
  }
  completeProfile() {
    this.submitted = true;
    if (this.compeleteProfileFormGroup.invalid) {
      return;
    }

    const compeleteUserProfileModel: CompeleteUserProfile =
      this.compeleteProfileFormGroup.value;
    if (!compeleteUserProfileModel.profileImage || compeleteUserProfileModel.profileImage.length <= 0) {
      compeleteUserProfileModel.profileImage = "https://www.ihep.org/wp-content/themes/ihep-theme/assets/images/user-profile.jpg";
    }
    compeleteUserProfileModel.invitationId = this.invitationId;
    this.authService.compeleteUserProfile(compeleteUserProfileModel).subscribe(
      (compeleteProfileResponse) => {
        if (
          compeleteProfileResponse.isValidResponse &&
          compeleteProfileResponse.result.responseData
        ) {
          let currentUser: User = this.authentedService.currentUser();
          this.authentedService.login(
            currentUser.id,
            compeleteUserProfileModel.fullName,
            compeleteUserProfileModel.jobTitle,
            compeleteUserProfileModel.profileImage,
            currentUser.userName,
            currentUser.email,
            currentUser.phoneNumber,
            compeleteUserProfileModel.workingDays,
            compeleteUserProfileModel.workingHours,
            currentUser.companyId,
            this.authentedService.currentUserToken,
            UserProfileStatuses.ProfileCompleted,
            currentUser.roleId,
            currentUser.languageId,
            currentUser.bio,
            currentUser.skills
          );
          this.modal.close();
          if (!this.invitationId || this.invitationId.length <= 0) {
            this.openNextModal(CompanyInfoComponent);
          } else {
            this.navigateToUrl(this.returnUrl);
          }
        } else {
          this.showErrorMessages(compeleteProfileResponse.errors);
        }
      },
      (err) => {
        this.errorOccured(err);
      }
    );
  }
  openNextModal(madalComponentName: any) {
    const modalRef = this.modalService.open(madalComponentName, {
      // size: 'xl',
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.id = 0;
    modalRef.result.then(() => { });
  }
}
