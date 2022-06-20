import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { CreateAccComponent } from './../../create-acc/create-acc.component';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent  extends BaseComponent implements OnInit {
  @Input() invitationId: string;
  private modalService: NgbModal;
  constructor() {
    super();
    const injector = AppInjector.getInjector();
    this.modalService = injector.get(NgbModal);
  }
  ngOnInit() {
    if (this.invitationId && this.invitationId.length > 0) {
      this.openCreateAccount();
    }
  }

  openCreateAccount() {
    this.openNextModal(CreateAccComponent);
  }

  openNextModal(madalComponentName: any) {
    const modalRef = this.modalService.open(madalComponentName, {
      //size: 'xl',
      modalDialogClass: 'crud-process',
    });
    if (madalComponentName == CreateAccComponent)
      modalRef.componentInstance.invitationId = this.invitationId;
    modalRef.result.then(() => {});
  }
}
