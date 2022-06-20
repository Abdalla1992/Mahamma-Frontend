import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications-comments',
  templateUrl: './notifications-comments.component.html',
  styleUrls: ['./notifications-comments.component.scss']
})
export class NotificationsCommentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  comment:string='';
  member:string='';
  commentReplay:string='';
  replay:boolean= false;

  addReplay():void{
    this.replay = !this.replay
  }


}
