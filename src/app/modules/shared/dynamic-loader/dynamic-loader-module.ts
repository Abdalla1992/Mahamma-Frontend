import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentHostDirective } from './directives/component-host.directive';
import { DynamicLoaderComponent } from './dynamic-loader-component';
import { MeetingModule } from '../../meeting/meeting.module';

@NgModule({
  declarations: [
    DynamicLoaderComponent,
    ComponentHostDirective,
  ],
  imports: [
    CommonModule,
    MeetingModule
  ],
  exports: [
    DynamicLoaderComponent,
  ],

})
export class DynamicLoaderModule { }