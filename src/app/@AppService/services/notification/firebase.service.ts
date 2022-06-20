import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FirebaseTokensUrls } from '../../Common/ServiceUrls';
import { ApiResponse } from '../../models/response.model';
import { GenericService } from '../Base/GenericService';

@Injectable({
  providedIn: 'root'
})
export class FirebaseTokenService {
  
  private GetFirebaseTokenUrl = environment.mahammaNotificationBaseUrl + FirebaseTokensUrls.GetFirebaseToken;
  private AddFirebaseTokenUrl = environment.mahammaNotificationBaseUrl + FirebaseTokensUrls.AddFirebaseToken;
  private RemoveFirebaseTokenUrl = environment.mahammaNotificationBaseUrl + FirebaseTokensUrls.RemoveFirebaseToken;
  constructor(private genericService: GenericService
  ) {
  }

  getFirebaseToken(): Observable<ApiResponse<string>> {
    return this.genericService.get<ApiResponse<string>>(this.GetFirebaseTokenUrl);
  }

  addFirebaseToken(token : any): Observable<ApiResponse<boolean>> {
    return this.genericService.post<ApiResponse<boolean>>(this.AddFirebaseTokenUrl, { firebaseToken: token });
  }

  removeFirebaseToken(token : any): Observable<ApiResponse<boolean>> {
    return this.genericService.post<ApiResponse<boolean>>(this.RemoveFirebaseTokenUrl, { firebaseToken: token });
  }
}
