import {
  MemberModel,
  SearchUserForWorkspace,
} from './../../../@AppService/models/search.member.model';
import { CompanyService } from './../../../@AppService/services/company.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';
import { Workspace } from 'src/app/@AppService/models/workspace.model';
import { WorkspaceService } from 'src/app/@AppService/services/workspace.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';
import { FileInfo } from 'src/app/@AppService/models/common.model';

@Component({
  selector: 'app-add-edit-workspace',
  templateUrl: './add-edit-workspace.component.html',
  styleUrls: ['./add-edit-workspace.component.scss'],
})
export class AddEditWorkspaceComponent
  extends BaseAddEditComponent<Workspace, Workspace>
  implements OnInit
{
  webImageInfo: FileInfo = {
    fileUrl: '',
    fileExtention: '',
    fileName: '',
    fileSize: '',
  };
  color: string;
  formGroup: FormGroup;
  avatarSelected: boolean;
  userList: MemberModel[];
  selectedUserList: MemberModel[] = [];
  searchUserForWorkspace: SearchUserForWorkspace;
  meberRemoved: boolean = false;
  imageUrl: string;
  private webFile: File;

  constructor(
    private fb: FormBuilder,
    workspaceService: WorkspaceService,
    public modal: NgbActiveModal,
    private companyService: CompanyService
  ) {
    super(workspaceService, modal);
  }

  ngOnInit(): void {
    super.ngOnInit();
    //this.backUrl = '/workspace/workspace-list';
  }

  loadForm(): void {
    //   debugger;
    this.formGroup = this.fb.group({
      name: [
        this.responseEntity.name,
        Validators.compose([Validators.required]),
      ],
      member: [this.responseEntity.member],
      imageUrl: [
        this.responseEntity.imageUrl
      ],
      color: [
        this.responseEntity.color
      ],
    });
    if (this.responseEntity) {
      this.imageUrl = this.responseEntity.imageUrl;
      if (
        this.responseEntity.members &&
        this.responseEntity.members.length > 0
      ) {
        this.selectedUserList = this.responseEntity.members;
      }
      this.color = this.responseEntity.color;
    } else {
      this.color = this.formGroup.get('color')?.value;
    }
    this.entity.id = this.responseEntity.id;
    this.entity.name = this.responseEntity.name;
    this.entity.userIdList = this.responseEntity.userIdList;
    this.entity.members = this.responseEntity.members;
    this.entity.member = this.responseEntity.member;
    this.entity.imageUrl = this.responseEntity.imageUrl;
    this.entity.color = this.responseEntity.color;
  }

  prepareEntity(): void {
    const formData = this.formGroup.value;
    this.entity.id = this.id;
    this.entity.name = formData.name;
    this.entity.imageUrl = formData.imageUrl;
    this.entity.color = formData.color;
  }

  clearEntity(): void {
    if (this.entity == undefined || this.entity == null) return;
    this.entity.name = '';
    this.entity.imageUrl = '';
    this.entity.color = '';
    this.entity.userIdList = [];
  }

  emptyEntity(): Workspace {
    return {
      id: undefined,
      name: '',
      imageUrl: '',
      color: '',
      userIdList: [],
      member: '',
      members: [],
      activationStatus: '',
    };
  }

  emptyResponseEntity(): Workspace {
    return {
      id: undefined,
      name: '',
      imageUrl: '',
      color: '',
      userIdList: [],
      member: '',
      members: [],
      activationStatus: '',
    };
  }

  setAvatar(element, avatarPath: string) {
    this.imageUrl = avatarPath;
    this.formGroup.controls.imageUrl.setValue(avatarPath);
    //element.srcElement.toggleClass('selected');
  }
  AutoCompleteChange(event: any) {
    this.userList = [];
    this.searchUserForWorkspace = {
      name: event.target.value,
      workspaceId: this.id,
    };
    this.companyService
      .searchUserForWorkspace(this.searchUserForWorkspace)
      .subscribe((member) => {
        if (member.isValidResponse) {
          this.userList = member.result.responseData;
          this.userList = this.userList.filter(
            (u) => !this.entity.userIdList.includes(u.userId)
          );
        }
      });
  }
  Selectautocomplete(option: MemberModel) {
    this.entity.userIdList.push(option.userId);
    this.selectedUserList.push(option);
    this.formGroup.get('member')?.setValue('');
    this.userList = [];
  }
  removeMember(element, userId: number) {
    this.entity.userIdList = this.entity.userIdList.filter((u) => u !== userId);
    element.srcElement.parentElement.remove();
  }
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
            this.formGroup.controls.imageUrl.setValue(event.fileUrl);
            this.imageUrl = event.fileUrl;
          }
        },
        (err) => {
          this.errorOccured(err);
        }
      );
    }
  }
  changeColor() {
    this.color = this.formGroup.get('color')?.value;
  }
}
