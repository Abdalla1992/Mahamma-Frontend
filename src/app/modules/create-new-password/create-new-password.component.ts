import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/@AppService/models/user.model';
import { UserService } from 'src/app/@AppService/services/user.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.scss']
})
export class CreateNewPasswordComponent extends BaseAddEditComponent<User,User> implements OnInit{

  formGroup: FormGroup;
  fieldTextType: boolean;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  constructor(
    private fb: FormBuilder,
    userService: UserService,
    public modal: NgbActiveModal
  ) {
    super(userService, modal);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  loadForm(): void {
    this.formGroup = this.fb.group({
      email: [
        this.entity.email,
        Validators.compose([Validators.required]),
      ],
    });
  }

  prepareEntity(): void {
    const formData = this.formGroup.value;

    this.entity.email = formData.email;
  }

  clearEntity(): void {
    if (this.entity == undefined || this.entity == null) return;

    this.entity.email='';
  }

  emptyEntity(): User {
    return {
      id: undefined,
      companyId: 0,
      fullName: '',
      jobTitle: '',
      phoneNumber: '',
      profileImage: '',
      roleId: 0,
      userName: '',
      userProfileStatusId: 0,
      workingDays: 0,
      workingHours: 0,
      authToken: '',
      email: '',
      languageId: 0,
      bio: '',
      skills: '',
      activationStatus: '',
    };
  }

  emptyResponseEntity(): User {
    return {
      id: undefined,
      companyId: 0,
      fullName: '',
      jobTitle: '',
      phoneNumber: '',
      profileImage: '',
      roleId: 0,
      userName: '',
      userProfileStatusId: 0,
      workingDays: 0,
      workingHours: 0,
      authToken: '',
      email: '',
      languageId: 0,
      bio: '',
      skills: '',
      activationStatus: '',
    };
  }
}
