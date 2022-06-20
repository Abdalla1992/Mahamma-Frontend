import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { LoadingService } from '../Component/loader-component/loader.service';
/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private _loading: LoadingService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

   if (request.headers.has('hideLoader')) {
    const headers = request.headers.delete('hideLoader');
    request = request.clone({ headers });
   }
   else{
    this._loading.setLoading(true, request.url);
   }


    if (request.url.includes('GetPersonalInfoByFilter')) {
      return next.handle(request).pipe(
        map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
            this._loading.setLoading(false, request.url);
            return evt;
        })
      );
    } else {
      return next
        .handle(request)
        .pipe(
          catchError((err) => {
            this._loading.setLoading(false, request.url);
            return throwError(err);
          })
        )
        .pipe(
          map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
            if (evt instanceof HttpResponse) {
              this._loading.setLoading(false, request.url);
            }
            return evt;
          })
        );
    }
  }
}
