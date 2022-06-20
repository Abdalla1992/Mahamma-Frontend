import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/@AppService/models/user.model';
import { UserService } from 'src/app/@AppService/services/user.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent extends BaseListComponent<User,User> {

  filterGroup: FormGroup;
  onFileChanged(event) {
    const file = event.target.files[0]
  }
  constructor(
    public userService: UserService,
    private fb: FormBuilder
  ) {
    super(userService);
    this.searchModel = {
      filter: {},
      paginator: { page: 0, pageSize: 6, total: 1000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
  }

  filterForm() {
    this.filterGroup = this.fb.group({
      name: [''],
    });
    this.subscriptions.push(
      this.filterGroup.controls.name.valueChanges.subscribe(() => this.filter())
    );
  }
  filter() {
    const filter = {};
    const name = this.filterGroup.controls['name'].value;
    if (name) {
      filter['name'] = name;
    }
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 6, total: 1000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.userService.fetch(this.searchModel);
  }

  option1:string='12 Hours';
  option2:string='24 Hours';
  option3:string='Sunday';
  option4:string='Monday';
  option5:string='MM/DD/YYYY';
  option6:string="DD/MM/YYYY";

}
