import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-tasks-percentage',
  templateUrl: './user-tasks-percentage.component.html',
  styleUrls: ['./user-tasks-percentage.component.scss']
})
export class UserTasksPercentageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  up:boolean = true;

}
