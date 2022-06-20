import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/@AppService/models/response.model';
import { BaseService } from 'src/app/@AppService/services/Base/base.service';
import { BaseComponent } from './baseComponent';

@Component({
  template: '',
})
export abstract class BaseAddEditComponent<TRequest, TResponse>
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @ViewChild('closebutton') closebutton;
  @Input() id: number;
  @Input() entityId: number;
  @Input() isCreatedFromMeeting: boolean;
  @Input() reloadCurrentPage: boolean = false;
  @Output() entityUpdatedOutput = new EventEmitter<boolean>();
  @Output() entityCreated = new EventEmitter<TResponse>();
  isLoading$;
  entity: TRequest;
  responseEntity: TResponse;
  backUrl: string;
  protected formGroup: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    public service: BaseService<TRequest, TResponse>,
    public modal: NgbActiveModal
  ) {
    super();
  }
  ngOnInit() {
    this.isLoading$ = this.service.isLoading$;
    this.getId();
    this.loadEntity();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  get form_Group() {
    return this.formGroup;
  }
  abstract loadForm(): void;
  abstract prepareEntity(): void;
  abstract clearEntity(): void;
  abstract emptyEntity(): TRequest;
  abstract emptyResponseEntity(): TResponse;

  getId(): void {
    if (this.backUrl) {
      this.baseActivatedRoute.paramMap
        .pipe(map(() => window.history.state))
        .subscribe((val) => {
          if (val.id === undefined) {
            this.navigateToUrl(this.backUrl);
          } else {
            this.id = val.id;
          }
        });
    }
  }

  loadEntity() {
    if (!this.id) {
      this.entity = this.emptyEntity();
      this.responseEntity = this.emptyResponseEntity();
      this.clearEntity();
      this.loadForm();
    } else {
      this.entity = this.emptyEntity();
      const sb = this.service
        .getItemById(this.id, this.isCreatedFromMeeting)
        .pipe(
          first(),
          catchError((errorMessage) => {
            if (this.backUrl) {
              this.navigateToUrl(this.backUrl);
            } else if (this.modal != null) {
              this.modal.dismiss(errorMessage);
            }
            this.errorOccured(errorMessage);
            return of(this.emptyEntity());
          })
        )
        .subscribe((response: ApiResponse<TResponse>) => {
          if (response.isValidResponse) {
            this.responseEntity = response.result.responseData;
            this.loadForm();
          } else {
            this.showErrorMessages(response.errors);
          }
        });
      this.subscriptions.push(sb);
    }
  }

  save() {
    this.prepareEntity();
    if (this.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  create() {
    const sbCreate = this.service
      .create(this.entity)
      .pipe(
        map((response: ApiResponse<TResponse>) => {
          if (response.isValidResponse) {
            this.onSaveSuccess(response);
            //this.showSuccessMessage(response.result.commandMessage);
            this.entityCreated.emit(response.result.responseData);
          } else {
            this.showErrorMessages(response.errors);
          }
        }),
        // tap(() => {
        //   if (this.backUrl) {
        //     this.navigateToUrl(this.backUrl);
        //   } else if (this.modal != null) {
        //     this.modal.close();
        //     if (this.router.url == '/') {
        //       this.navigateToUrl('/dashboard/');
        //     }
        //   }
        // }),
        catchError((errorMessage) => {
          if (this.backUrl) {
            this.navigateToUrl(this.backUrl);
          } else if (this.modal != null) {
            this.modal.dismiss(errorMessage);
          }
          this.errorOccured(errorMessage);
          return of(this.entity);
        })
      )
      .subscribe((res: any) => (this.responseEntity = res));
    this.subscriptions.push(sbCreate);
  }
  onSaveSuccess(response: ApiResponse<TResponse>) {
    this.showSuccessMessage(response.result.commandMessage);
    if (this.backUrl) {
      this.navigateToUrl(this.backUrl);
    } else if (this.modal != null) {
      this.modal.close();
      if (this.router.url == '/') {
        this.navigateToUrl('/dashboard/');
      }
    }
  }

  edit() {
    const sbUpdate = this.service
      .update(this.entity)
      .pipe(
        map((response: ApiResponse<TResponse>) => {
          if (response.isValidResponse) {
            this.onSaveSuccess(response);
            if (
              response.result.commandMessage == 'Permissions Added Successfully'
            ) {
              this.navigateToUrl('/setting/permissions/');
            }
          } else {
            this.showErrorMessages(response.errors);
          }
        }),
        // tap(() => {
        //   if (this.backUrl) {
        //     this.navigateToUrl(this.backUrl);
        //   } else if (this.modal != null) {
        //     this.modal.close();
        //     if (this.reloadCurrentPage) {

        //       this.entityUpdatedOutput.emit(true);
        //     }
        //   }
        // }),
        catchError((errorMessage) => {
          if (this.backUrl) {
            this.navigateToUrl(this.backUrl);
          } else if (this.modal != null) {
            this.modal.dismiss(errorMessage);
          }
          this.errorOccured(errorMessage);
          return of(this.entity);
        })
      )
      .subscribe((res: any) => {
        this.responseEntity = res;
      });
    this.subscriptions.push(sbUpdate);
  }

  back() {
    if (this.backUrl) {
      this.navigateToUrl(this.backUrl);
    }
  }

  closeModal() {
    this.closebutton.nativeElement.click();
  }
}
