import { Company } from './../models/company.model';
import { CompanyUrls } from './../Common/ServiceUrls';
import { CompanyModel } from '../models/auth.model';
import { Inject, Injectable } from '@angular/core';
import { BaseService } from './Base/base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './Base/GenericService';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/response.model';
import {
  MemberModel,
  SearchUserForProject,
  SearchUserForTask,
  SearchUserForWorkspace,
} from '../models/search.member.model';
import { CompanyInvitation } from '../models/company-invitation.model';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { FileContent } from '../models/file-content.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService extends BaseService<CompanyModel, CompanyModel> {
  mahammaBaseUrl: string = environment.mahammaApiBaseUrl;
  constructor(
    @Inject(HttpClient) http,
    private generalService: GenericService,
    private authenticationService: AuthenticationService
  ) {
    super(http);
    this.Urls.CreateUrl =
      environment.mahammaApiBaseUrl + CompanyUrls.AddCompany;
    this.Urls.GetByIdUrl =
      environment.mahammaApiBaseUrl + CompanyUrls.GetCompanyById;
  }

  createCompany(CompanyModel: CompanyModel): Observable<ApiResponse<number>> {
    return this.generalService.post<ApiResponse<number>>(
      this.Urls.CreateUrl,
      CompanyModel
    );
  }
  searchUserForProject(
    searchUserForProject: SearchUserForProject
  ): Observable<ApiResponse<MemberModel[]>> {
    return this.generalService.post<ApiResponse<MemberModel[]>>(
      this.mahammaBaseUrl + CompanyUrls.SearchUserForProjectUrl,
      searchUserForProject
    );
  }

  searchUserForTask(
    searchUserForTask: SearchUserForTask
  ): Observable<ApiResponse<MemberModel[]>> {
    return this.generalService.post<ApiResponse<MemberModel[]>>(
      this.mahammaBaseUrl + CompanyUrls.SearchUserForTaskUrl,
      searchUserForTask
    );
  }

  searchUserForWorkspace(
    searchUserForWorkspace: SearchUserForWorkspace
  ): Observable<ApiResponse<MemberModel[]>> {
    return this.generalService.post<ApiResponse<MemberModel[]>>(
      this.mahammaBaseUrl + CompanyUrls.SearchUserForWorkspaceUrl,
      searchUserForWorkspace
    );
  }

  getCompanyInvitation(
    invitationId: string
  ): Observable<ApiResponse<CompanyInvitation>> {
    return this.generalService.get<ApiResponse<CompanyInvitation>>(
      this.mahammaBaseUrl +
        CompanyUrls.GetCompanyInvitationUrl +
        '?invitationId=' +
        invitationId
    );
  }
  getCompanyById(): Observable<ApiResponse<Company>> {
    return this.generalService.get<ApiResponse<Company>>(
      this.Urls.GetByIdUrl +
        '?id=' +
        this.authenticationService.currentUser().companyId
    );
  }
  createCompanyInvitation(): Observable<ApiResponse<CompanyInvitation>> {
    return this.generalService.get<ApiResponse<CompanyInvitation>>(
      this.mahammaBaseUrl + CompanyUrls.CreateCompanyInvitationUrl
    );
  }
  setEmailToCompanyInvitation(
    companyInvitation: CompanyInvitation
  ): Observable<ApiResponse<boolean>> {
    return this.generalService.post<ApiResponse<boolean>>(
      this.mahammaBaseUrl + CompanyUrls.SetEmailToCompanyInvitationUrl,
      companyInvitation
    );
  }

  sendInvitationsFromFile(uploadedFiles: FileContent[]){
    return this.http.post<ApiResponse<boolean>>(
      environment.mahammaApiBaseUrl + CompanyUrls.SendInvitationsFromFile,
      { uploadedFiles: uploadedFiles }, {headers: { hideLoader: 'true' }}
    );
  }

}
