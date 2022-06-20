import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { confirmationType } from 'src/app/@AppService/Enums/confirmation-type';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  @Input() componentType: confirmationType;
  messageTitle: string;
  messageBody: string;
  showOk: boolean;
  showDelete: boolean;

  constructor(public modal: NgbActiveModal) {
    this.showDelete = false;
    this.showOk = false;
  }

  ngOnInit(): void {
    if (this.componentType == confirmationType.Delete) {
      this.messageTitle = 'Delete Item!';
      this.messageBody = 'Are you sure you want to delete this record !!!';
      this.showDelete = true;
    }
    else if(this.componentType == confirmationType.Activate){
      this.messageTitle = 'Activate Item!';
      this.messageBody = 'Are you sure you want to Activate this record !!!';
      this.showOk = true;
    }
    else if(this.componentType == confirmationType.Deactivate){
      this.messageTitle = 'Deactivate Item!';
      this.messageBody = 'Are you sure you want to Deactivate this record !!!';
      this.showOk = true;
    } else if(this.componentType == confirmationType.Archive){
      this.messageTitle = 'Archive Data!';
      this.messageBody = 'Are you sure you want to archive this record !!!';
      this.showOk = true;
    }else if(this.componentType == confirmationType.PublishEpisode){
      this.messageTitle = 'Publish Episode!';
      this.messageBody = 'Are you sure you want to publish this Episode !!!';
      this.showOk = true;
    }
    else if(this.componentType == confirmationType.SetAsDefault){
      this.messageTitle = 'Set Item as default!';
      this.messageBody = 'Are you sure you want to set item as default!!!';
      this.showOk = true;
    }
  }

  Delete(): void {
    this.modal.close('Delete');
  }

  OK(): void {
    this.modal.close('OK');
  }
}
