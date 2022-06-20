import { CompeleteUserProfile } from 'src/app/@AppService/models/auth.model';
import { FileContent } from 'src/app/@AppService/models/file-content.model';
import { User } from 'src/app/@AppService/models/user.model';
import { NewUser } from './../models/auth.model';
import { environment } from 'src/environments/environment';
import { GenericService } from './Base/GenericService';
import { Inject, Injectable } from '@angular/core';
import { AuthenticationUrls } from '../Common/ServiceUrls';
import { LoginResponse, LoginUser, UserViewAction } from '../models/auth.model';
import { Observable } from 'rxjs';
import { ApiResponse, Result } from '../models/response.model';
import { BaseService } from './Base/base.service';
import { HttpClient } from '@angular/common/http';
import { GoogleLoginUser } from '../models/login/google.auth.model';
import { PagePermissionModel, RoleResponseModel } from '../models/permissions/permissions.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<User, User> {
  mahammaIdentityBaseUrl: string = environment.mahammaIdentityApiBaseUrl;
  forgetPasswordUrl: string;
  constructor(
    @Inject(HttpClient) http,
    private generalService: GenericService
  ) {
    super(http);
    this.Urls.UploadFileUrl =
      environment.mahammaDocumentApiBaseUrl + AuthenticationUrls.UploadProfileImage;
    this.forgetPasswordUrl = this.mahammaIdentityBaseUrl + AuthenticationUrls.ForgetPasswordUrl;
  }

  login(loginUser: LoginUser): Observable<ApiResponse<LoginResponse>> {
    return this.generalService.getData<ApiResponse<LoginResponse>>(
      this.mahammaIdentityBaseUrl + AuthenticationUrls.LoginUrl,
      loginUser
    );
  }

  createAccount(newAccount: NewUser): Observable<ApiResponse<LoginResponse>> {
    return this.generalService.post<ApiResponse<LoginResponse>>(
      this.mahammaIdentityBaseUrl + AuthenticationUrls.CreateAccountUrl,
      newAccount
    );
  }

  uploadProfileImage(files: File): Observable<FileContent> {
    return this.uploadFile(files);
  }

  compeleteUserProfile(compeleteUserProfile: CompeleteUserProfile): Observable<ApiResponse<boolean>> {
    return this.generalService.post<ApiResponse<boolean>>(
      this.mahammaIdentityBaseUrl + AuthenticationUrls.CompeleteUserProfileUrl,
      compeleteUserProfile
    );
  }

  googleExternalLogin(
    externalUser: GoogleLoginUser
  ): Observable<ApiResponse<LoginResponse>> {
    return this.generalService.post<ApiResponse<LoginResponse>>(
      this.mahammaIdentityBaseUrl + AuthenticationUrls.ExternalLoginUrl,
      externalUser
    );
  }

  getUserViewActionList(viewId: number): Observable<ApiResponse<number[]>> {
    const viewActionRequest: UserViewAction = { pageId: viewId };

    return this.generalService.getData<ApiResponse<number[]>>(
      this.mahammaIdentityBaseUrl + AuthenticationUrls.GetUserViewActionListUrl,
      viewActionRequest
    );
  }

  forgetPassword(email: string): Observable<ApiResponse<boolean>> {
    return this.generalService.get<ApiResponse<boolean>>(this.forgetPasswordUrl + '?email=' + email);
  }
}
