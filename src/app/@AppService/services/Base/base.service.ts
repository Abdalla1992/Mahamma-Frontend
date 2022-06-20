import {
  PaginatorState,
  SearchModel,
  SortState,
} from './../../models/common/search.model';
// tslint:disable:variable-name
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
// import { PaginatorState } from '../models/paginator.model';
// import { ITableState, TableResponseModel } from '../models/table.model';
// import { BaseModel } from '../models/base.model';
// import { SortState } from '../models/sort.model';
// import { GroupingState } from '../models/grouping.model';

import { FileContent } from 'src/app/@AppService/models/file-content.model';
import { BaseModel } from '../../models/base/base.model';
import { TableResponseModel } from '../../models/response.model';
import { IUrl } from '../../models/url.model';

const DEFAULT_STATE: SearchModel = {
  filter: {},
  paginator: new PaginatorState(),
  sorting: new SortState(),
  // searchTerm: '',
  //grouping: new GroupingState(),
  entityId: undefined,
};

// const DEFAULT_URL: IUrl = {
//   ListUrl: '',
//   GetByIdUrl: '',
//   CreateUrl: '',
// };
export abstract class BaseService<TRequest, TResponse> {
  // Private fields
  private _items$ = new BehaviorSubject<TResponse[]>([]);
  public _isLoading$ = new BehaviorSubject<boolean>(false);
  private _isFirstLoading$ = new BehaviorSubject<boolean>(true);
  private _tableState$ = new BehaviorSubject<SearchModel>(DEFAULT_STATE);
  public _errorMessage = new BehaviorSubject<string>('');
  private _subscriptions: Subscription[] = [];

  public totalCount: number;

  // Getters
  get items$() {
    return this._items$.asObservable();
  }
  get isLoading$() {
    return this._isLoading$.asObservable();
  }
  get isFirstLoading$() {
    return this._isFirstLoading$.asObservable();
  }
  get errorMessage$() {
    return this._errorMessage.asObservable();
  }
  get subscriptions() {
    return this._subscriptions;
  }
  //   get totalRecords() {
  //     return this._tableState$.value.paginator.total;
  //   }
  // State getters
  //   get paginator() {
  //     return this._tableState$.value.paginator;
  //   }
  //   get filter() {
  //     return this._tableState$.value.filter;
  //   }
  //   get sorting() {
  //     return this._tableState$.value.sorting;
  //   }
  //   get searchTerm() {
  //     return this._tableState$.value.searchTerm;
  //   }
  //   get grouping() {
  //     return this._tableState$.value.grouping;
  //   }

  // URLS
  Urls: IUrl = {
    ListUrl: '',
    GetByIdUrl: '',
    CreateUrl: '',
    UpdateUrl: '',
    DeleteUrl: '',
    ArchiveUrl: '',
    DeleteListUrl: '',
    ChangeStatusUrl: '',
    ActivateDeavtivateUrl: '',
    DDLUrl: '',
    UploadFileUrl: '',
    GetByIdForViewUrl: '',
    TaskFilesUrl: '',
    TaskActivitiesUrl: '',
    TaskAddCommentUrl: '',
    TaskAssignMemberUrl: '',
    TaskSubmitUrl: '',
    TaskReviewUrl: '',
    GetProjectStatistics: '',
    GetNotifications: '',
    GetNotificationsCount: '',
    AllNotificationsSeen: '',
    ListMinuteOfMeeting: '',
    CreateMinuteOfMeeting: '',
    UpdateMinuteOfMeeting: '',
    DeleteMinuteOfMeeting: '',
    PublishAllMinutesOfMeeting: '',
    AddFolder: '',
    ListFolders: '',
    RenameFolder: '',
    MoveFile: '',
    DeleteFolder: '',
    GetFolder: '',
    AddNotificationSchedule: '',
    UpdateNotificationSchedule: '',
    DeleteNotificationScheduleUrl: '',
    GetUserNotificationSchedule: '',
    RateMemberTaskUrl: '',
  };

  protected http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  // READ (Returning filtered list of entities)
  find(searchModel: SearchModel): Observable<TableResponseModel<TResponse>> {
    this._errorMessage.next('');
    return this.http
      .post<TableResponseModel<TResponse>>(this.Urls.ListUrl, searchModel)
      .pipe(
        map((response: any) => {
          const result: TableResponseModel<TResponse> = {
            items: response.dataList,
            total: response.totalCount,
          };
          return result;
        }),
        catchError((err) => {
          this._errorMessage.next(err);
          console.error('FIND ITEMS', err);
          return of({ items: [], total: 0 });
        })
      );
  }

  getItemById(id: number, requestedFromMeeting?: boolean): Observable<any> {
    debugger;
    this._isLoading$.next(true);
    this._errorMessage.next('');

    return this.http.get<any>(this.Urls.GetByIdUrl + '?id=' + id).pipe(
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('GET ITEM BY IT', id, err);
        return of({ id: undefined, activationStatus: '' });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  getItem(url: string): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');

    return this.http.get<BaseModel>(url).pipe(
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('GET ITEM ', err);
        return of({});
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }
  getItemByIdForView(id: number): Observable<BaseModel> {
    this._isLoading$.next(true);
    this._errorMessage.next('');

    return this.http
      .get<BaseModel>(this.Urls.GetByIdForViewUrl + '?id=' + id)
      .pipe(
        catchError((err) => {
          this._errorMessage.next(err);
          console.error('GET ITEM BY IT', id, err);
          return of({ id: undefined, activationStatus: '' });
        }),
        finalize(() => this._isLoading$.next(false))
      );
  }

  getDDL(ddlURL: string): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this.http.get<any>(ddlURL).pipe(
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('GET DDL', err);
        return of({ ddls: undefined });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  uploadFile(files: File): Observable<FileContent> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const formData = new FormData();
    formData.append('file', files);
    // formData.append('uploadType',uploadType);
    return this.http.post<FileContent>(this.Urls.UploadFileUrl, formData).pipe(
      map((response: FileContent) => {
        return response;
      }),
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('Upload ITEM', err);
        return of({ fileName: '', fileUrl: '', actualFileName: '' });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // CREATE
  // server should return the object with ID
  create(item: TRequest): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');

    return this.http.post<any>(this.Urls.CreateUrl, item).pipe(
      // map((response: any) => {
      //   return response;
      // }),
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('CREATE ITEM', err);
        return of({ id: undefined, activationStatus: '' });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // UPDATE
  update(item: TRequest): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this.http.put(this.Urls.UpdateUrl, item).pipe(
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('UPDATE ITEM', item, err);
        return of(item);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // DELETE
  delete(id: any): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this.http.delete(this.Urls.DeleteUrl + '?id=' + id).pipe(
      map((response: any) => {
        //  console.log("Del Response")
        //  console.log(response);
        return response;
      }),
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('DELETE ITEM', id, err);
        return of({});
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  archive(id: any): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this.http.delete(this.Urls.ArchiveUrl + '?id=' + id).pipe(
      map((response: any) => {
        //  console.log("Del Response")
        //  console.log(response);
        return response;
      }),
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('DELETE ITEM', id, err);
        return of({});
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // delete list of items
  deleteItems(ids: number[] = []): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');

    const body = { ids };
    return this.http.put(this.Urls.DeleteListUrl, body).pipe(
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('DELETE SELECTED ITEMS', ids, err);
        return of([]);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }
  // activate / deactivate
  activateDeactivate(id: any): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');

    return this.http.delete(this.Urls.ActivateDeavtivateUrl + '?id=' + id).pipe(
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('Activate / Deactivate ITEM', id, err);
        return of({});
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // UPDATE Status
  updateStatusForItems(ids: number[], status: number): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const body = { ids, status };
    return this.http.put(this.Urls.ChangeStatusUrl, body).pipe(
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('UPDATE STATUS FOR SELECTED ITEMS', ids, status, err);
        return of([]);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  httpPut(url: string, obj: any): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this.http.put<any>(url, obj).pipe(
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('Http GET :', err);
        return of({ ddls: undefined });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }
  public fetch(searchmodel: SearchModel) {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find(searchmodel)
      .pipe(
        tap((res: TableResponseModel<TResponse>) => {
          this._items$.next(res.items);
          this.totalCount = res.total;
          //  this.patchStateWithoutFetch({
          //    paginator: this._tableState$.value.paginator.recalculatePaginator(
          //      res.total
          //    ),
          //  });
        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            items: [],
            total: 0,
          });
        }),
        finalize(() => {
          //debugger;
          this._isLoading$.next(false);
          const itemIds = this._items$.value.map((el: TResponse) => {
            const item = el as unknown as BaseModel;
            return item.id;
          });
          //  this.patchStateWithoutFetch({
          //    grouping: this._tableState$.value.grouping.clearRows(itemIds),
          //  });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }

  public searchEntity(searchmodel: SearchModel) {
    this.fetch(searchmodel);
  }
  //   public setDefaults() {
  //     this.patchStateWithoutFetch({ filter: {} });
  //     this.patchStateWithoutFetch({ sorting: new SortState() });
  //     this.patchStateWithoutFetch({ grouping: new GroupingState() });
  //     this.patchStateWithoutFetch({ searchTerm: '' });
  //     this.patchStateWithoutFetch({
  //       paginator: new PaginatorState(),
  //     });
  //     this._isFirstLoading$.next(true);
  //     this._isLoading$.next(true);
  //     this._tableState$.next(DEFAULT_STATE);
  //     this._errorMessage.next('');
  //   }

  // Base Methods
  //   public searchEntity() {
  //     this.fetch();
  //   }

  //   public patchState(patch: Partial<ITableState>) {
  //     this.patchStateWithoutFetch(patch);
  //     this.fetch();
  //   }

  //   public patchStateWithoutFetch(patch: Partial<ITableState>) {
  //     const newState = Object.assign(this._tableState$.value, patch);
  //     this._tableState$.next(newState);
  //   }
}
