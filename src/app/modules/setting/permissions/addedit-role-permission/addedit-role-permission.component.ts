import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SystemActions } from 'src/app/@AppService/Enums/security';
import {
  PagePermissionModel,
  RoleRequestModel,
  RoleResponseModel,
} from 'src/app/@AppService/models/permissions/permissions.model';
import { ApiResponse } from 'src/app/@AppService/models/response.model';
import { MemberModel } from 'src/app/@AppService/models/search.member.model';
import { User } from 'src/app/@AppService/models/user.model';
import { CompanyService } from 'src/app/@AppService/services/company.service';
import { RoleService } from 'src/app/@AppService/services/role/role.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';

@Component({
  selector: 'app-addedit-role-permission',
  templateUrl: './addedit-role-permission.component.html',
  styleUrls: ['./addedit-role-permission.component.scss'],
})
export class AddEditRolePermissionComponent
  extends BaseAddEditComponent<RoleRequestModel, RoleResponseModel>
  implements OnInit
{
  formGroup: FormGroup;
  userList: MemberModel[];
  selectedUserList: MemberModel[] = [];
  pagePermissions: PagePermissionModel[] = [];
  selectedPagePermissions?: number[] = [];

  public get Actions(): typeof SystemActions {
    return SystemActions;
  }

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private companyService: CompanyService,
    public modal: NgbActiveModal,
    private route: ActivatedRoute
  ) {
    super(roleService, modal);
    debugger;
    // this.backUrl='/setting/permissions/';

    // this.id = Number(JSON.parse(this.route.snapshot.paramMap.get('id') || '0'));
    this.id = this.baseActivatedRoute.snapshot.queryParams['id'];
    roleService.getAllPagePermission().subscribe((result) => {
      this.pagePermissions = result.responseData;
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  loadForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(this.responseEntity.name, [Validators.required]),
      member: new FormControl(['']),
    });
    this.selectedPagePermissions = this.responseEntity?.pagePermissions?.map(
      (pagePermission) => {
        return Number(pagePermission.id);
      }
    );
    this.responseEntity?.users?.forEach((user) => {
      this.selectedUserList?.push({
        profileImage: user.profileImage,
        workspaceId: 0,
        fullName: user.fullName,
        userId: user.id,
        workspaceName: '',
        rating: 0,
      });
      this.entity.userIds?.push(user.id);
    });
  }
  prepareEntity(): void {
    const formData = this.formGroup.value;
    this.entity.name = formData.name;
    if (this.responseEntity) {
      this.entity.pagePermissionIds = this.selectedPagePermissions;
    }
  }
  clearEntity(): void {
    if (this.entity == undefined || this.entity == null) return;
    this.entity.name = '';
  }
  emptyEntity(): RoleRequestModel {
    return {
      id: this.id,
      name: '',
      userIds: [],
      pagePermissionIds: [],
    };
  }
  emptyResponseEntity(): RoleResponseModel {
    return {
      id: 0,
      name: '',
      users: [],
      pagePermissions: [],
    };
  }
  AutoCompleteChange(event: any) {
    this.userList = [];
    let searchUserForWorkSpace = {
      name: event.target.value,
      workspaceId: 0,
    };
    this.companyService
      .searchUserForWorkspace(searchUserForWorkSpace)
      .subscribe((member) => {
        if (member.isValidResponse) {
          this.userList = member.result.responseData;
          this.userList = this.userList.filter(
            (u) => !this.entity.userIds?.includes(u.userId)
          );
        }
      });
  }
  Selectautocomplete(option: MemberModel) {
    this.entity.userIds?.push(option.userId);
    this.selectedUserList.push(option);
    this.formGroup.get('member')?.setValue('');
    this.userList = [];
  }
  removeMember(element, userId: number) {
    this.entity.userIds = this.entity.userIds?.filter((u) => u !== userId);
    element.srcElement.parentElement.remove();
  }
  changeModel(ev, list, val) {
    if (ev.target.checked) {
      list.push(val);
    } else {
      let i = list.indexOf(val);
      list.splice(i, 1);
    }
  }
  // override onSaveSuccess(response:ApiResponse<RoleResponseModel>){
  //   this.showSuccessMessage(response?.result?.commandMessage);
  //    this.navigateToUrl(this.backUrl);
  // }
}
