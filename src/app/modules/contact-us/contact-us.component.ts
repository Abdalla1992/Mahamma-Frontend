import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectActivityModel } from 'src/app/@AppService/models/project-activities.model';
import { Project } from 'src/app/@AppService/models/project.model';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  @Input() projectId: number;
  projectActivities: ProjectActivityModel[];

  constructor(
    private projectService: ProjectService,
    public modal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
    this.projectService
      .getProjectActivites(this.projectId)
      .subscribe((project) => {
        this.projectActivities = project.result.responseData;
      });
  }
}
