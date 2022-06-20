import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './app-user';
import { UserToken } from './app-user-token';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSessionName = 'mahamma-currentUser';
  private userTokenSessionName = 'mahamma-currentUserToken';
  private userNotificationConnectionIdName = 'mahamma-notificationConnectionId';
  private userRefreshTokenSessionName = 'mahamma-currentUserRefreshToken';

  constructor() {}
  public currentUser(): User {
    return this.getUser();
  }

  public get currentUserToken(): string {
    return this.getUserToken();
  }

  public get userLogedIn(): boolean {
    if (this.getUser() != null) {
      return true;
    } else {
      return false;
    }
  }

  isUserLoginedHasValidToken() {
    const jwtHelper = new JwtHelperService();
    return this.userLogedIn && !jwtHelper.isTokenExpired(this.currentUserToken);
  }

  login(
    loginUserId: number,
    loginFullName: string,
    loginJobTitle: string,
    loginProfileImage: string,
    loginuserName: string,
    loginEmail: string,
    loginPhoneNumber: string,
    loginWorkingDays: number,
    loginWorkingHours: number,
    loginCompanyId: number,
    loginToken: string,
    loginUserProfileStatusId: number,
    loginRoleId: number,
    loginLanguageId: number,
    loginBio: string,
    loginSkills: string
    // loginRefreshToken: string
  ) {
    const user: User = {
      id: loginUserId,
      profileImage: loginProfileImage,
      fullName: loginFullName,
      jobTitle: loginJobTitle,
      userName: loginuserName,
      email: loginEmail,
      phoneNumber: loginPhoneNumber,
      workingDays: loginWorkingDays,
      workingHours: loginWorkingHours,
      companyId: loginCompanyId,
      userProfileStatusId: loginUserProfileStatusId,
      roleId: loginRoleId,
      languageId: loginLanguageId,
      bio: loginBio,
      skills: loginSkills,
    };

    const token: UserToken = { token: loginToken };
    // const refreshtoken: UserRefreshToken = { refreshToken: loginRefreshToken };

    localStorage.setItem(this.userSessionName, JSON.stringify(user));
    localStorage.setItem(this.userTokenSessionName, JSON.stringify(token));
    // localStorage.setItem(this.userRefreshTokenSessionName, JSON.stringify(refreshtoken));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(this.userSessionName);
    localStorage.removeItem(this.userTokenSessionName);
    // localStorage.removeItem(this.userNotificationConnectionIdName);
  }

  updateTokens(newToken: string, newRefreshToken: string) {
    const token: UserToken = { token: newToken };
    //const refreshtoken: UserRefreshToken = { refreshToken: newRefreshToken };

    localStorage.setItem(this.userTokenSessionName, JSON.stringify(token));
    //localStorage.setItem(this.userRefreshTokenSessionName, JSON.stringify(refreshtoken));
  }
  private getUser(): User {
    const userStorage = JSON.parse(
      localStorage.getItem(this.userSessionName) || '{}'
    );
    let userObj: User = new User();
    if (userStorage !== null && userStorage !== undefined) {
      userObj = userStorage as unknown as User;
    }

    return userObj;
  }

  private getUserToken(): string {
    let token = '';
    const userStorage = JSON.parse(
      localStorage.getItem(this.userTokenSessionName) || '{}'
    );
    let userObj: UserToken = { token: '' };
    if (userStorage !== null && userStorage !== undefined) {
      userObj = userStorage as unknown as UserToken;
      token = userObj.token;
    }

    return token;
  }
}
