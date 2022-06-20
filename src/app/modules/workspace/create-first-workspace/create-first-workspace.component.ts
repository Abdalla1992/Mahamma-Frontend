import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';
import { FileInfo } from 'src/app/@AppService/models/common.model';
import { MemberModel, SearchUserForWorkspace } from 'src/app/@AppService/models/search.member.model';
import { Workspace } from 'src/app/@AppService/models/workspace.model';
import { WorkspaceService } from 'src/app/@AppService/services/workspace.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';

@Component({
  selector: 'app-create-first-workspace',
  templateUrl: './create-first-workspace.component.html',
  styleUrls: ['./create-first-workspace.component.scss']
})
export class CreateFirstWorkspaceComponent
extends BaseAddEditComponent<Workspace, Workspace>
implements OnInit
{

  formGroup: FormGroup;
  color: string;
  imageUrl: string;
  webImageInfo: FileInfo = {
    fileUrl: '',
    fileExtention: '',
    fileName: '',
    fileSize: '',
  };
  selectedUserList: MemberModel[] = [];
  private webFile: File;

  constructor(
    private fb: FormBuilder,
    workspaceService: WorkspaceService,
    public modal: NgbActiveModal
  ) {
    super(workspaceService, modal);
    this.setUserPrivilage(Pages.WorkspaceProfile, SystemActions.AddWorkspace);
  }
  
  loadForm(): void {
    this.formGroup = this.fb.group({
      name: [
        this.responseEntity.name,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      member: [this.responseEntity.member],
      imageUrl: [
        this.responseEntity.imageUrl,
        Validators.compose([Validators.required]),
      ],
      color: [
        this.responseEntity.color,        
      ],
    });
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

  changeColor() {
    this.color = this.formGroup.get('color')?.value;
  }

  setAvatar(element, avatarPath: string) {
    this.imageUrl = avatarPath;
    this.formGroup.controls.imageUrl.setValue(avatarPath);
    //element.srcElement.toggleClass('selected');
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

}


