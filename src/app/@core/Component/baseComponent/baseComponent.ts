import { Router, ActivatedRoute } from '@angular/router';
//import { SystemActions, Pages } from 'src/app/@AppService/Enums/security';
//import { PageChangingEvent } from '../../events/page-change-event';
import { AppInjector } from '../../Injector/app-injectore';
import { FormGroup } from '@angular/forms';
import { HostListener, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import * as moment from 'moment';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';
import { AuthService } from 'src/app/@AppService/services/auth.service';

@Injectable()
export abstract class BaseComponent {
  // private authentedService: AuthenticationService;
  protected authService: AuthService;
  protected router: Router;
  protected baseActivatedRoute: ActivatedRoute;
  private http: HttpClient;
  private toastr: ToastrService;
  // private basePageEvent: PageChangingEvent;
  private privilegeList: number[] = [];

  constructor() {
    const injector = AppInjector.getInjector();
    this.authService = injector.get(AuthService);
    // this.authentedService = injector.get(AuthenticationService);
    this.router = injector.get(Router);
    this.toastr = injector.get(ToastrService);

    //this.basePageEvent = injector.get(PageChangingEvent);
    this.baseActivatedRoute = injector.get(ActivatedRoute);
    this.http = injector.get(HttpClient);
    this.drawInputDate();
    // this.baselanghandler.languagechangeemitter$.subscribe((item: number) =>
    //   this.langchangedeventhandler(item)
    // );
  }

  /////////////////////////////////////////////////////////////////////////////
  //////////// Reload Page
  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    this.BeforeReload();
  }

  public BeforeReload() {}

  /////////////////////////////////////////////////////////////////////////////
  //////////// User Privilege
  get SystemActions() {
    return SystemActions;
  }
  setUserPrivilage(pageId: Pages, systemAction: SystemActions) {
    if (pageId != null && systemAction != null) {
      this.checkPagePrivilege(pageId, systemAction);
    }
  }

  private checkPagePrivilege(pageId: Pages, systemAction: SystemActions): void {
    this.authService.getUserViewActionList(pageId).subscribe(
      (result) => {
        if (result.isValidResponse) {
          this.checkPrivilage(result.result.responseData, systemAction);
        } else {
          this.showErrorMessage(result.result.commandMessage);
        }
      },
      (err) => {
        this.errorOccured(err);
      }
    );
  }

  private checkPrivilage(
    userPrivilege: number[],
    systemAction: SystemActions
  ): void {
    this.privilegeList = userPrivilege;

    if (!this.CheckActionPrivilage(systemAction)) {
      this.navigateToUrl(`/dashboard/index`);
    }
  }

  public CheckActionPrivilage(systemAction: SystemActions): boolean {
    //return true;
    return this.privilegeList.indexOf(systemAction) > -1;
  }

  /////////////////////////////////////////////////////////////////////////////
  //////////// Navigation

  navigateToUrl(url: string): void {
    this.router.navigate([url]);
  }

  navigateToUrlWithId(url: string, id: number): void {
    this.router.navigate([url], { queryParams: { id: id } });
  }
  // navigateToUrlWithNavigationInfo(
  //   url: string,
  //   mode: PageMode,
  //   data: any
  // ): void {
  //   const redirectInfo: PageInteractionMode = {
  //     pageMode: mode,
  //     redirectData: data,
  //   };

  //   this.router.navigateByUrl(url, {
  //     state: { NavigationMode: redirectInfo },
  //   });
  // }
  navigateToUrlById(url: string, id: number): void {
    this.router.navigateByUrl(url, {
      state: { id: id },
    });
  }
  navigateToUrlByData(url: string, data: any): void {
    this.router.navigateByUrl(url, {
      state: { data: data },
    });
  }

  /////////////////////////////////////////////////////////////////////////////
  //////////// Navigation
  saveToSession(data: any) {
    sessionStorage.setItem('PageData', JSON.stringify(data));
  }

  readSession(): any {
    const data = JSON.parse(sessionStorage.getItem('PageData') || '{}');
    sessionStorage.removeItem('PageData');
    return data;
  }

  /////////////////////////////////////////////////////////////////////////////
  //////////// Toster  https://github.com/scttcper/ngx-toastr

  showSuccessMessage(message: string): void {
    this.openSucssToster(message);
  }

  showErrorMessage(message: string): void {
    this.openErrorToster(message);
  }
  showErrorMessages(message: string[]): void {
    message.forEach((element) => {
      this.openErrorToster(element);
    });
  }
  errorOccured(error: string): void {
    console.log(error);
    this.openErrorToster('An error has occurred please try again later');
  }

  private openSucssToster(message: string) {
    this.toastr.success(message);
  }

  private openErrorToster(message: string) {
    this.toastr.error(message);
  }

  ////////////////////////////
  /////////// Get Date
  getDate(value: string | number | Date): Date | null {
    if (value !== undefined && value != null) {
      const d = new Date(value);
      const date = new Date(
        Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
      );
      return date;
    }
    return null;
  }

  //////////////////////////////////////////////////////
  ////// download File
  downloadFile(url) {
    console.log(url);
    window.open(url, '_self');
  }

  //////////////////////////////////////////////////////
  ////// Validator
  public restrictNumeric(e: { metaKey: any; ctrlKey: any; which: number }) {
    let input: string;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 46) {
      return true;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  public restrictNotStartWithZero(e: {
    metaKey: any;
    ctrlKey: any;
    which: number;
    srcElement: any;
  }) {
    let input: string;
    if (!e.srcElement.value) {
      if (e.which === 48) {
        return false;
      }
    }

    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  // helpers for View
  submitted: boolean = false;
  isControlValid(controlName: string, fg: FormGroup): boolean {
    const control = fg.controls[controlName];
    return (
      control.valid && ((control.dirty && control.touched) || this.submitted)
    );
  }
  isDropDownControlInvalid(controlName: string, fg: FormGroup): boolean {
    const control = fg.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || this.submitted)
    );
  }
  isControlInvalid(controlName: string, fg: FormGroup): boolean {
    const control = fg.controls[controlName];
    return (
      control.invalid && ((control.dirty && control.touched) || this.submitted)
    );
  }

  controlHasError(validation, controlName, fg: FormGroup): boolean {
    const control = fg.controls[controlName];
    return (
      control.hasError(validation) &&
      ((control.dirty && control.touched) || this.submitted)
    );
  }
  isControlTouched(controlName, fg: FormGroup): boolean {
    const control = fg.controls[controlName];
    return control.dirty || control.touched || this.submitted;
  }

  drawInputDate() {
    $(document).ready(function () {
      var dateFormate = 'DD/MM/YYYY';
      $('input[type=date]').on('keydown', function () {
        return false;
      });
      $('input[type=time]').on('keydown', function () {
        return false;
      });
      $('input[type=date]')
        .on('change', function () {
          var $this = $(this);
          console.log($this.val());
          var date = moment($this.val(), 'YYYY-MM-DD').format(dateFormate);
          var dateValue = date === 'Invalid date' ? 'dd/mm/yyyy' : date;
          (<any>$this).setAttribute('data-date', dateValue);
        })
        .trigger('change');
    });
  }

  SetDateFormat($event) {
    const dateFormate = 'DD/MM/YYYY';
    var date = moment($event.target.value, 'YYYY-MM-DD').format(dateFormate);
    var dateValue = date === 'Invalid date' ? 'dd/mm/yyyy' : date;
    $event.target.setAttribute('data-date', dateValue);
  }
}
