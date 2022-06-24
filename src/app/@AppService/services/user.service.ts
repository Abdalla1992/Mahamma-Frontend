import { UserProfileSetting } from './../models/user-profile-setting.model';
import { AuthenticationUrls, UserUrls } from './../Common/ServiceUrls';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { BaseService } from './Base/base.service';
import { GenericService } from './Base/GenericService';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/response.model';
import { UserProfileSectionDto } from 'src/app/@core/auth/app-user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User, User> implements OnDestroy {
  mahammaIdentityBaseUrl: string = environment.mahammaIdentityApiBaseUrl;
  updateUserProfileSettingsUrl: string;
  userProfileId: number;
  updateUserProfileSectionUrl: string;

  constructor(
    @Inject(HttpClient) http,
    private genericService: GenericService
  ) {
    super(http);

    this.Urls.ListUrl =
      environment.mahammaIdentityApiBaseUrl + UserUrls.ListUser;
    this.Urls.GetByIdUrl =
      environment.mahammaIdentityApiBaseUrl + UserUrls.GetUserById;
    this.Urls.CreateUrl =
      environment.mahammaIdentityApiBaseUrl + UserUrls.CreateUser;
    this.Urls.UpdateUrl =
      environment.mahammaIdentityApiBaseUrl + UserUrls.UpdateUser;
    this.Urls.DeleteUrl =
      environment.mahammaIdentityApiBaseUrl + UserUrls.DeleteUser;
    this.updateUserProfileSettingsUrl =
      environment.mahammaIdentityApiBaseUrl +
      UserUrls.UpdateUserProfileSettingUrl;
   this.updateUserProfileSectionUrl =
      environment.mahammaIdentityApiBaseUrl + UserUrls.updateUserProfileSectionUrl;
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  getMembersList(memberIdList: number[]): Observable<ApiResponse<User[]>> {
    return this.genericService.post<ApiResponse<User[]>>(
      this.mahammaIdentityBaseUrl + UserUrls.GetMemberList,
      memberIdList
    );
  }

  updateUserProfileSettings(
    userProfileSettings: UserProfileSetting
  ): Observable<ApiResponse<boolean>> {
    return this.genericService.post<ApiResponse<boolean>>(
      this.updateUserProfileSettingsUrl,
      userProfileSettings
    );
  }

  getUserById(id: number): Observable<ApiResponse<User>> {
    return this.genericService.get<ApiResponse<User>>(this.Urls.GetByIdUrl + '?id=' + id);
  }

  updateUserProfileSection( userId:number,
    userProfileSection: UserProfileSectionDto[]
  ): Observable<ApiResponse<boolean>> {
    return this.genericService.post<ApiResponse<boolean>>(
      this.updateUserProfileSectionUrl,
      {userId : userId , userProfileSections: userProfileSection}
    );
  }
}
