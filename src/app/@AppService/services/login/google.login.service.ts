import { Injectable, NgZone } from '@angular/core';
import { GoogleLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../../models/auth.model';
import { CompanyInvitation } from '../../models/company-invitation.model';
import { GoogleLoginUser } from '../../models/login/google.auth.model';
import { ApiResponse } from '../../models/response.model';
import { MemberModel } from '../../models/search.member.model';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root',
})
export class GoogleLoginService {

  gapi: any;
  private auth: gapi.auth2.GoogleAuth;
  private user: gapi.auth2.GoogleUser;
  constructor(private zone: NgZone, private authService: AuthService) {
    this.load()
      .then(() => this.init())
      .then((auth) => {
        this.auth = auth;
      });
  }
  private load(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        gapi.load('auth2', {
          callback: resolve,
          onerror: reject,
        });
      });
    });
  }
  private init(): Promise<gapi.auth2.GoogleAuth> {
    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        const auth = gapi.auth2.init({
          client_id: environment.googleClientId,
        });
        resolve(auth);
      });
    });
  }
  loginForUser(invitationId: string): Promise<[ApiResponse<LoginResponse>, MemberModel]> {
    return new Promise((resolve, reject) => {
      return this.zone.run(() => {
        return this.auth.signIn()
          .then(user => {
            this.user = user;
            let userBasicProfile = user.getBasicProfile();
            const googleUser: GoogleLoginUser = {
              provider: GoogleLoginProvider.PROVIDER_ID,
              idToken: user.getAuthResponse().id_token,
              fullName: userBasicProfile.getName(),
              invitationId: invitationId
            };
            const userData: MemberModel =
            {
              fullName: userBasicProfile.getName(),
              profileImage: userBasicProfile.getImageUrl(),
              userId: 0,
              workspaceId: 0,
              workspaceName: "",
              rating:0
            }

            this.authService.googleExternalLogin(googleUser).subscribe(result => resolve([result, userData]));
          });
      });
    });
  }
  /// to represent the user in some google services like upload files to his drive
  loginForCode(): Promise<{ code: string }> {
    return this.zone.run(() => {
      return this.auth.grantOfflineAccess().then((response) => {
        return response;
      });
    });
  }
}
