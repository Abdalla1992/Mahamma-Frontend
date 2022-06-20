import { SearchModel } from './../../../@AppService/models/common/search.model';

// import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { FormGroup } from '@angular/forms';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { of, Subscription } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { BaseService } from 'src/app/@AppService/services/Base/base.service';
// import { AppInjector } from '../../Injector/app-injectore';
// import { BaseComponent } from './baseComponent';
// // import { confirmationType } from 'src/app/@AppService/Enums/confirmation-type';
// // import {
// //   BaseModel,
// //   ICreateAction,
// //   IDeleteAction,
// //   IEditAction,
// //   IFilterView,
// //   ISortView,
// //   PaginatorState,
// //   SortState,
// //   TableService,
// // } from 'src/app/_metronic/shared/crud-table';
// // import { ApiResponse } from 'src/app/_metronic/shared/crud-table/models/response.model';
// // import { AppInjector } from '../../Injector/app-injectore';
// // import { BaseComponent } from '../BaseComponent/BaseComponent';
// // import { ConfirmationComponent } from '../confirmation/confirmation.component';

import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { BaseService } from 'src/app/@AppService/services/Base/base.service';
import { AppInjector } from '../../Injector/app-injectore';
import { BaseComponent } from './baseComponent';
import { ConfirmationComponent } from '../confirmation/confirmation/confirmation.component';
import { confirmationType } from 'src/app/@AppService/Enums/confirmation-type';
import { BaseModel } from 'src/app/@AppService/models/base/base.model';
import { ApiResponse } from 'src/app/@AppService/models/response.model';
import { catchError, map } from 'rxjs/operators';

@Component({
  template: '',
})
export abstract class BaseListComponent<TRequest,TResponse>
  extends BaseComponent
  implements OnInit, OnDestroy
{
  protected subscriptions: Subscription[] = [];
  public modalService: NgbModal;
  @Input() addEditComponent: any;
  @Input() anOtheraddEditComponent: any;
  @Input() entityId: number;
  searchModel: SearchModel;

  constructor(public service: BaseService<TRequest,TResponse>) {
    super();
    const injector = AppInjector.getInjector();
    this.modalService = injector.get(NgbModal);
  }

  ngOnInit() {
    // debugger;
    this.filterForm();
    this.filter();
    // this.service.fetch(this.searchModel);
    // this.paginator = this.service.paginator;
    // this.sorting = this.service.sorting;
    // const sb = this.service.isLoading$.subscribe(
    //   (res) => (this.isLoading = res)
    // );
    // this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  abstract filterForm(): void;
  abstract filter(): void;
  create() {
    this.edit(0);
  }

  edit(id: number) {
    const modalRef = this.modalService.open(this.addEditComponent, {
      // size: 'xl',
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.entityId = this.entityId;
    modalRef.result.then(
      () => this.filter(),
      () => {}
    );
  }

  delete(entity: BaseModel) {
    const modalRef = this.modalService.open(ConfirmationComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.componentType = confirmationType.Delete;
    modalRef.result.then(
      (response) => {
        this.deleteRecord(entity.id);
      },
      () => {}
    );
  }

  deleteRecord(id) {
    this.service
      .delete(id)
      .pipe(
        map((response: ApiResponse<boolean>) => {
          if (response.isValidResponse) {
            this.showSuccessMessage(response.result.commandMessage);
          } else {
            this.showErrorMessages(response.errors);
          }
        }),

        catchError((errorMessage) => {
          this.errorOccured(errorMessage);
          return of(errorMessage);
        })
      )
      .subscribe((response: any) => {
        this.service.searchEntity(this.searchModel);
      });
  }

  archive(entity: BaseModel) {
    const modalRef = this.modalService.open(ConfirmationComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.componentType = confirmationType.Archive;
    modalRef.result.then(
      (response) => {
        this.archiveRecord(entity.id);
      },
      () => {}
    );
  }
  archiveRecord(id) {
    this.service
      .archive(id)
      .pipe(
        map((response: ApiResponse<boolean>) => {
          if (response.isValidResponse) {
            this.showSuccessMessage(response.result.commandMessage);
          } else {
            this.showErrorMessages(response.errors);
          }
        }),

        catchError((errorMessage) => {
          this.errorOccured(errorMessage);
          return of(errorMessage);
        })
      )
      .subscribe((response: any) => {
        this.service.searchEntity(this.searchModel);
      });
  }

  OpenPopUp(component: any, options: any, inputs: [string, any][] = [], outputs : [string, any][] = [] ){
    const modalRef = this.modalService.open(component, options);
    for (let [key, value] of inputs) {
      modalRef.componentInstance[key] = value;
    }
    for (let [key, value] of outputs) {
      modalRef.componentInstance[key].subscribe(value);
    }
    modalRef.result.then(
      () => this.filter(),
      () => {}
    );
  }
}

//   //ICreateAction,
//   //IEditAction,
//   //IDeleteAction,
//  // ISortView,
// //   IFilterView,
// //   IFilterView
//   {
// //   paginator: PaginatorState;
// //   sorting: SortState;
//   isLoading: boolean;
//   filterGroup: FormGroup;
//   protected subscriptions: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

//   private modalService: NgbModal;
//   @Input() addEditComponent: any;
//   @Input() SingleViewComponent: any;
//   addUrl: string;
//   editUrl: string;
//   viewUrl: string;

//   constructor(public service: BaseService<T>) {
//     super();

//     const injector = AppInjector.getInjector();
//     this.modalService = injector.get(NgbModal);
//   }

//   ngOnInit() {
//     this.filterForm();
//     this.service.fetch();
//     this.paginator = this.service.paginator;
//     this.sorting = this.service.sorting;
//     const sb = this.service.isLoading$.subscribe(
//       (res) => (this.isLoading = res)
//     );
//     this.subscriptions.push(sb);
//   }

//   ngOnDestroy() {
//     this.subscriptions.forEach((sb) => sb.unsubscribe());
//   }

//   abstract filterForm(): void;
//   abstract filter(): void;

//   // sorting
//   sort(column: string) {
//     const sorting = this.sorting;
//     const isActiveColumn = sorting.column === column;
//     if (!isActiveColumn) {
//       sorting.column = column;
//       sorting.direction = 'asc';
//     } else {
//       sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
//     }
//     this.service.patchState({ sorting });
//   }

//   // pagination
//   paginate(paginator: PaginatorState) {
//     this.service.patchState({ paginator });
//   }

//   viewItem(id: any) {
//     if (this.viewUrl) {
//       this.navigateToUrlById(this.viewUrl, id);
//     } else {
//       const modalRef = this.modalService.open(this.SingleViewComponent, {
//         size: 'xl',
//       });
//       modalRef.componentInstance.id = id;
//       modalRef.result.then(
//         () => this.service.fetch(),
//         () => { }
//       );
//     }
//   }

//   create() {
//     this.edit(0);
//   }

//   edit(id: number) {
//     if (this.addUrl && this.editUrl) {
//       const url = id === undefined ? this.addUrl : this.editUrl;
//       this.navigateToUrlById(url, id);
//     } else {
//       const modalRef = this.modalService.open(this.addEditComponent, {
//         size: 'xl',
//       });
//       modalRef.componentInstance.id = id;
//       modalRef.result.then(
//         () => this.service.fetch(),
//         () => { }
//       );
//     }
//   }

//   delete(entity: BaseModel) {
//     const modalRef = this.modalService.open(ConfirmationComponent, {
//       size: 'lg',

//     });
//     modalRef.componentInstance.componentType = confirmationType.Delete;
//     modalRef.result.then(
//       (response) => {
//         this.deleteRecord(entity.id);
//       },
//       () => { }
//     );
//   }

//   deleteRecord(id) {
//     this.service
//       .delete(id)
//       .pipe(
//         map((response: ApiResponse<boolean>) => {
//           if (response.isValidResponse) {
//             this.showSuccessMessage(response.result.commandMessage);
//           } else {
//             this.showErrorMessages(response.errors);
//           }
//         }),

//         catchError((errorMessage) => {
//           this.errorOccured(errorMessage);
//           return of(errorMessage);
//         })
//       )
//       .subscribe((response: any) => {
//         this.service.searchEntity();
//       });
//   }

//   activete_Deactivate(entity: BaseModel) {
//     const modalRef = this.modalService.open(ConfirmationComponent, {
//       size: 'lg',
//     });

//     if (entity.activationStatus.toLocaleLowerCase() === 'active') {
//       modalRef.componentInstance.componentType = confirmationType.Deactivate;
//     } else {
//       modalRef.componentInstance.componentType = confirmationType.Activate;
//     }

//     modalRef.result.then(
//       (response) => {
//         this.activete_DeactivateRecord(entity.id);
//       },
//       () => { }
//     );
//   }

//   activete_DeactivateRecord(id) {
//     this.service
//       .activateDeactivate(id)
//       .pipe(
//         map((response: ApiResponse<boolean>) => {
//           if (response.isValidResponse) {
//             this.showSuccessMessage(response.result.commandMessage);
//           } else {
//             this.showErrorMessages(response.errors);
//           }
//         }),

//         catchError((errorMessage) => {
//           this.errorOccured(errorMessage);
//           return of(errorMessage);
//         })
//       )
//       .subscribe((response: any) => {
//         this.service.searchEntity();
//       });
//   }
// }
