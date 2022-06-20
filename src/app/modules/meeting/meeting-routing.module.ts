import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { MeetingProfileComponent } from './meeting-profile/meeting-profile.component';
import { MeetingComponent } from './meeting.component';
import { MinutesOfMeetingComponent } from './minutes-of-meeting/minutes-of-meeting.component';

const routes: Routes = [
  {
    path:'',
    component: MeetingComponent
  },
  {
    path:'all',
    component: MeetingListComponent
  },
  {
    path:'meeting/:id',
    component: MeetingProfileComponent
  },
  {
    path:':id/minutes-meeting',
    component: MinutesOfMeetingComponent
  },
  {
    path:'add-meeeting',
    component: AddMeetingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }
