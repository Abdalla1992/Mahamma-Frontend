import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/@AppService/models/user.model';
import { UserService } from 'src/app/@AppService/services/user.service';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  invitationId: string;
  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {    
    this.invitationId = this.route.snapshot.queryParams['invId'];
  }
}
