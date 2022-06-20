import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectActivityModel } from 'src/app/@AppService/models/project-activities.model';
import { ProjectService } from 'src/app/@AppService/services/project.service';

@Component({
  selector: 'app-my-work-notes-activities',
  templateUrl: './my-work-notes-activities.component.html',
  styleUrls: ['./my-work-notes-activities.component.scss']
})
export class MyWorkNotesActivitiesComponent implements OnInit {
  @Input() projectId: number;
  projectActivities: ProjectActivityModel[];

  constructor(
    private projectService: ProjectService,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.projectService
      .getProjectActivites(this.projectId)
      .subscribe((project) => {
        this.projectActivities = project.result.responseData;
      });
  }
}

