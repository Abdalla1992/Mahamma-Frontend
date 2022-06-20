import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/@AppService/models/user.model';
import { UserService } from 'src/app/@AppService/services/user.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';

@Component({
  selector: 'app-search-member-list',
  templateUrl: './search-member-list.component.html',
  styleUrls: ['./search-member-list.component.scss'],
})
export class SearchMemberListComponent extends BaseListComponent<User, User> implements OnChanges {

  filterGroup: FormGroup;
  @Input() searchKeyword : string;
  @Input() isSetInFilter : boolean;

  constructor(public userService: UserService, private fb: FormBuilder) {
    super(userService);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.filter();
  }
  
  filterForm() {
    this.filterGroup = this.fb.group({
      name: [this.searchKeyword],
    });
    this.subscriptions.push(
      this.filterGroup.controls.name.valueChanges.subscribe(() => this.filter())
    );
  }

  filter() {
    const filter = {};
    const name = this.searchKeyword;
    if (name) {
      filter['fullName'] = name;
    }
    this.searchModel = {
      filter: filter,
      paginator: { page: 0, pageSize: 10, total: 100000000, pageSizes: [] },
      sorting: { column: '', direction: 'asc' },
      entityId: 0,
    };
    this.userService.fetch(this.searchModel);
  }
  openProfile(id: number) {
    // // debugger;
    this.userService.userProfileId = id;
    this.navigateToUrl('profile/');
    // //this.workspacesService.workspaceEmmiter.emit(id);
  }
}
