import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/@AppService/models/user.model';
import { UserService } from 'src/app/@AppService/services/user.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent extends BaseComponent implements OnInit {

  forgetPasswordForm: FormGroup;
  fieldTextType: boolean;
  email: string;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  constructor(
    private fb: FormBuilder,
    userService: UserService,
    public modal: NgbActiveModal
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm(): void {
    //   debugger;
    this.forgetPasswordForm = this.fb.group({
      email: [
        this.email,
        Validators.compose([Validators.required,
        Validators.pattern(
          new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        )]),
      ],
    });
  }

  save() {
    const formData = this.forgetPasswordForm.value;
    this.email = formData.email;
    this.authService.forgetPassword(this.email).subscribe(response => {
      if (response.isValidResponse) {
        if (response.result.responseData) {
          this.showSuccessMessage(response.result.commandMessage);
          this.modal.close();
        } else {
          this.showErrorMessage(response.result.commandMessage);
        }
      } else {
        this.showErrorMessages(response.errors);
      }
    })
  }
}
