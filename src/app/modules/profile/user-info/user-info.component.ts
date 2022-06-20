import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  currentRate = 4;
  constructor() {
    // stars.max =5;
  }

  ngOnInit(): void {
  }


}
