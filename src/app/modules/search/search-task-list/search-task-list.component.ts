import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search-task-list',
  templateUrl: './search-task-list.component.html',
  styleUrls: ['./search-task-list.component.scss'],
})
export class SearchTaskListComponent implements OnChanges {

  @Input() searchKeyword : string;
  @Input() isSetInFilter : boolean;
  show: boolean = true;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

  }
}