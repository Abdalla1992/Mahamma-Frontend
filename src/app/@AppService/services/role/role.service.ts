import { environment } from 'src/environments/environment';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Result } from '../../models/response.model';
import { BaseService } from '../Base/base.service';
import { PagePermissionModel, RoleRequestModel, RoleResponseModel } from '../../models/permissions/permissions.model';
import { GenericService } from '../Base/GenericService';
import { RolesUrls } from '../../Common/ServiceUrls';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends BaseService<RoleRequestModel,RoleResponseModel> {
  mahammaIdentityBaseUrl: string = environment.mahammaIdentityApiBaseUrl;
  constructor(
    @Inject(HttpClient) http,
    private generalService: GenericService
  ) {
    super(http);
    this.Urls.GetByIdUrl =
      this.mahammaIdentityBaseUrl + RolesUrls.GetRole;
    this.Urls.CreateUrl =
      this.mahammaIdentityBaseUrl + RolesUrls.AddRole;
    this.Urls.UpdateUrl =
      this.mahammaIdentityBaseUrl + RolesUrls.UpdateRole;
    this.Urls.DeleteUrl =
      this.mahammaIdentityBaseUrl + RolesUrls.DeleteRole;
  }

  getAllCompanyRoles(): Observable<Result<RoleResponseModel[]>> {
    return this.generalService.get<Result<RoleResponseModel[]>>(
      this.mahammaIdentityBaseUrl + RolesUrls.GetAllCompanyRolesUrl);
  }
  
  getAllPagePermission(): Observable<Result<PagePermissionModel[]>> {
    return this.generalService.get<Result<PagePermissionModel[]>>(
      this.mahammaIdentityBaseUrl + RolesUrls.GetAllPagePermissionUrl);
  }
}
