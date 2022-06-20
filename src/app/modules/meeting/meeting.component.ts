import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { Component, OnInit } from '@angular/core';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent extends BaseComponent implements OnInit  {

  constructor()
   {
    super();
     this.setUserPrivilage(Pages.ManageMeetings,SystemActions.ViewMeeting)
  }

  ngOnInit(): void {
  }

}
