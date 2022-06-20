import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/@AppService/models/user.model';
import { UserService } from 'src/app/@AppService/services/user.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

const states = ['Fatma', 'Gamal', 'Mohamed'];

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.scss']
})
export class NewDashboardComponent extends BaseAddEditComponent<User,User> implements OnInit{

  formGroup: FormGroup;

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
 //   debugger;
    this.formGroup = this.fb.group({
      id: [
        this.entity.id,
        Validators.compose([Validators.required]),
      ],
    });
  }

  prepareEntity(): void {
    const formData = this.formGroup.value;

    this.entity.id = formData.id;
  }

  clearEntity(): void {
    if (this.entity == undefined || this.entity == null) return;

    this.entity.id='';
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
