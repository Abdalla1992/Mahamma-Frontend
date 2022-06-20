import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { promise } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  constructor(private http: HttpClient) {}

  // READ

  getData<T>(actionUrl: string, requestObj: T | any): Observable<T> {
    return this.http.post<T>(actionUrl, requestObj);
  }

  async getDataAsyc<T>(actionUrl: string, requestObj: T | any): Promise<T> {
    return await this.http
      .post<T>(actionUrl, requestObj)
      .toPromise()
      .then((value) => value);
  }

  // CURD
  updateData<T>(actionUrl: string, requestObj: T | any): Observable<T> {
    return this.http.post<T>(actionUrl, requestObj);
  }

  deleteData<T>(actionUrl: string): Observable<T> {
    return this.http.delete<T>(actionUrl);
  }
  get<T>(actionUrl: string): Observable<T> {
    return this.http.get<T>(actionUrl);
  }
  updateDataWithoutBaseModel<T>(
    actionUrl: string,
    requestObj: T | any
  ): Observable<T> {
    return this.http.post<T>(actionUrl, requestObj);
  }

  post<T>(actionUrl: string, requestObj: T | any): Observable<T> {
    return this.http.post<T>(actionUrl, requestObj);
  }

  putData<T>(actionUrl: string, requestObj: T | any): Observable<T> {
    return this.http.put<T>(actionUrl, requestObj);
  }
}
