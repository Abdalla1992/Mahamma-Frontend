import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const userToken = this.authService.currentUserToken;
    if (userToken) {
      request = request.clone({
        setHeaders: {
          Authorization: userToken.includes('Bearer')
            ? userToken
            : `Bearer ${userToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
