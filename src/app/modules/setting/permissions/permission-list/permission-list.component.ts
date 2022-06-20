import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { confirmationType } from 'src/app/@AppService/Enums/confirmation-type';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';
import { RoleRequestModel, RoleResponseModel } from 'src/app/@AppService/models/permissions/permissions.model';
import { RoleService } from 'src/app/@AppService/services/role/role.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { ConfirmationComponent } from 'src/app/@core/Component/confirmation/confirmation/confirmation.component';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent extends BaseListComponent<RoleRequestModel, RoleResponseModel> implements OnInit {
  filterForm(): void {
    throw new Error('Method not implemented.');
  }
  filter(): void {
    throw new Error('Method not implemented.');
  }

  roles: RoleResponseModel[] = [];
  constructor(private roleService: RoleService) {
    super(roleService);
    this.setUserPrivilage(Pages.ManageRoles,SystemActions.ViewRole)
  }

  ngOnInit(): void {
    this.roleService.getAllCompanyRoles().subscribe(result => {
      this.roles = result.responseData;
    });
  }

  editRolePage(id: any) {
    this.navigateToUrlWithId('setting/permissions/addedit', id);
  }

  navigateToAddRole(){
    this.navigateToUrl('setting/permissions/addedit');
  }
  deleteRole(id: number) {
    const modalRef = this.modalService.open(ConfirmationComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.componentType = confirmationType.Delete;
    modalRef.result.then(
      (response) => {
        this.deleteRecord(id);
      },
      () => { }
    );
  }

}
