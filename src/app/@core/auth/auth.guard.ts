import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "src/app/@AppService/services/auth.service";
import { AuthenticationService } from "./authentication.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private authService: AuthService
      ) { }

      async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const jwtHelper = new JwtHelperService();
        if (
          this.authenticationService.isUserLoginedHasValidToken()) {
          // logged in so return true
          return true;
        } else {
          console.log('token expired');
        }
    
        // const refrestoken = this.authenticationService.currentUserRefreshToken;
        // if (refrestoken !== undefined && refrestoken != null && refrestoken != '') {
        //   const isRefreshSuccess = await this.tryRefreshingTokens(refrestoken);
        //   if (isRefreshSuccess) {
        //     return true;
        //   }
        // }
    
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/home/landing'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }
}