import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MeetingRole } from 'src/app/@AppService/Enums/meeting/meeting-role';
import { MemberModel } from 'src/app/@AppService/models/search.member.model';

@Component({
  selector: 'app-attendee-list',
  templateUrl: './attendee-list.component.html',
  styleUrls: ['./attendee-list.component.scss']
})
export class AttendeeListComponent implements OnInit {

  @Input() members: MemberModel[] = [];
  @Input() membersRoles:  Record<number, number[]>[] = [];
  @Input() attendees?: number[] = [];
  @Output() attendanceCheck = new EventEmitter<number>();

  public get MeetingRole(): typeof MeetingRole {
    return MeetingRole;
  }
  
  constructor() { }

  ngOnInit(): void {
  }
  
  onAttendeeChecked(userId) {
    this.attendanceCheck.emit(userId);
  }

  hasAttended(userId) : boolean{
    return (this.attendees || []).includes(userId);
  }

  getMeetingRoles(userId){
    let key = Object.keys(this.membersRoles).find(key => key == userId);
    let meetingRoles = this.membersRoles[key || 0];
    let index = 0;
    let result = "";
    for (const role of meetingRoles) {
      result += `${index > 0 ? ", " : ""}`
      result += `${MeetingRole[role]}`
      index++;
    }
    return result;
  }
}
