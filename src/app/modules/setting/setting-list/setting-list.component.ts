import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { Component, OnInit } from '@angular/core';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';

@Component({
  selector: 'app-setting-list',
  templateUrl: './setting-list.component.html',
  styleUrls: ['./setting-list.component.scss']
})
export class SettingListComponent extends BaseComponent implements OnInit {

  constructor() {
    super()
    this.setUserPrivilage(Pages.ManageRoles,SystemActions.ViewRole);
   }

  ngOnInit(): void {
  }

}
