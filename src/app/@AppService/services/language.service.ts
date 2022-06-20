import { LanguageUrls } from './../Common/ServiceUrls';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LanguageDto } from '../models/common/language-dto';
import { ApiResponse } from '../models/response.model';
import { BaseService } from './Base/base.service';
import { GenericService } from './Base/GenericService';

@Injectable({
  providedIn: 'root',
})
export class LanguageService
  extends BaseService<LanguageDto, LanguageDto>
  implements OnDestroy
{
  getAllLanguagesUrl: string;
  getLanguageUrl: string;
  constructor(
    @Inject(HttpClient) http,
    private genericService: GenericService
  ) {
    super(http);

    this.getAllLanguagesUrl =
      environment.mahammaIdentityApiBaseUrl + LanguageUrls.GetAllLanguages;
    this.getLanguageUrl =
      environment.mahammaIdentityApiBaseUrl + LanguageUrls.GetLanguage;
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  getAllLanguages(): Observable<ApiResponse<LanguageDto[]>> {
    return this.genericService.get<ApiResponse<LanguageDto[]>>(
      this.getAllLanguagesUrl
    );
  }
  getLanguage(id: number): Observable<ApiResponse<LanguageDto>> {
    return this.genericService.get<ApiResponse<LanguageDto>>(
      this.getLanguageUrl + '?id=' + id
    );
  }
}
