import { Injectable } from "@angular/core";
import { MeetingProfileComponent } from "../meeting/meeting-profile/meeting-profile.component";
import { ProjectProfileComponent } from "../project/project-profile/project-profile.component";
import { ComponentItem } from "../shared/dynamic-loader/contracts/dynamic-component";
import { DynamicLoaderComponentsDictionary } from "../shared/dynamic-loader/contracts/dynamic-loader-component-dictionary";
import { TaskComponent } from "../task/task.component";
import { WorkspaceProfileComponent } from "../workspace/workspace-profile/workspace-profile.component";

@Injectable()
export class NotifictationComponentDictionary implements DynamicLoaderComponentsDictionary {
    public getDynamicComponents(): ComponentItem[] {
        return this._dynamicComponents;
    }

    private _dynamicComponents: ComponentItem[] = [
         new ComponentItem(TaskComponent, "Task") ,
         new ComponentItem(ProjectProfileComponent, "Project") ,
         new ComponentItem(WorkspaceProfileComponent, "Workspace") ,
         new ComponentItem(MeetingProfileComponent, "Meeting") ,
    ]

}