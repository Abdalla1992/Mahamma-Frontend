import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/@AppService/models/user.model';
import { UserService } from 'src/app/@AppService/services/user.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { NewDashboardComponent } from '../new-dashboard/new-dashboard.component';

@Component({
  selector: 'app-dashboard-title',
  templateUrl: './dashboard-title.component.html',
  styleUrls: ['./dashboard-title.component.scss']
})
export class DashboardTitleComponent extends BaseListComponent<User,User> implements OnInit{

  filterGroup: FormGroup;
  constructor( public userService: UserService, private fb: FormBuilder)
  {
    super(userService);
    this.addEditComponent = NewDashboardComponent;
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
}

