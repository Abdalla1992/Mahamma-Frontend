import { EventEmitter } from '@angular/core';

export class PageChangingEvent {
  public pageChangeEmitter$: EventEmitter<string>;
  constructor() {
    this.pageChangeEmitter$ = new EventEmitter();
  }
  changePage(pageName: string): void {
    this.pageChangeEmitter$.emit(pageName);
  }
}
