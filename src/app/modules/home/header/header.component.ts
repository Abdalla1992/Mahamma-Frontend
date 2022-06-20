import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
import { CreateAccComponent } from '../../create-acc/create-acc.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private modalService: NgbModal;
  constructor() {
    const injector = AppInjector.getInjector();
    this.modalService = injector.get(NgbModal);
  }

  ngOnInit(): void {
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
      modalRef.componentInstance.invitationId = '';
    modalRef.result.then(() => { });
  }
}
