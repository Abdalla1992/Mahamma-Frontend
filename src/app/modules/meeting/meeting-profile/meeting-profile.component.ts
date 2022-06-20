import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DurationUnitType } from 'src/app/@AppService/Enums/duration-unit-type';
import { MeetingResponse } from 'src/app/@AppService/models/meeting/meeting-response.model';
import { MeetingService } from 'src/app/@AppService/services/meeting/meeting.service';
import { IDynamicComponent } from '../../shared/dynamic-loader/contracts/dynamic-component';

@Component({
  selector: 'app-meeting-profile',
  templateUrl: './meeting-profile.component.html',
  styleUrls: ['./meeting-profile.component.scss']
})
export class MeetingProfileComponent implements OnInit, IDynamicComponent {
  id: number;
  isReadOnly: boolean = true;
  meeting: MeetingResponse;
  meetingFinishDate: Date;
  attendees : number[] = [];

  constructor(private route: ActivatedRoute,public meetingService: MeetingService) {
    this.id = this.id || Number(JSON.parse(this.route.snapshot.paramMap.get('id') || '0'));
  }

  ngOnInit(): void {
    this.meetingService.getItemById(this.id).subscribe(response => 
      {
        this.meeting = response.result.responseData;
        let meetingEndingIn = this.meeting.durationUnitType == DurationUnitType.Minutes ? this.meeting.duration * 60000 : (this.meeting.duration * 60) * 60000;
        this.meetingFinishDate = new Date(new Date(this.meeting.date).getTime() + meetingEndingIn)
      });
  }

  onAttendeeChecked(userId) {
    var index = this.attendees.indexOf(userId);
    if (index === -1) {
      this.attendees.push(userId);
    } else {
      this.attendees.splice(index, 1);
    }
  }
}
