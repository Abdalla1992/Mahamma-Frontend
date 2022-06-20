import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';
import { Project } from 'src/app/@AppService/models/project.model';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
import { MyWorkNotesActivitiesComponent } from '../my-work-notes-activities/my-work-notes-activities.component';

@Component({
  selector: 'app-my-work-notes-header',
  templateUrl: './my-work-notes-header.component.html',
  styleUrls: ['./my-work-notes-header.component.scss']
})
export class MyWorkNotesHeaderComponent extends BaseComponent {
  @Input() project: Project;
  @Output() onUpdateProject = new EventEmitter<any>();

  private modalService: NgbModal;

  constructor(public projectService: ProjectService,
    public modal: NgbActiveModal) {
    super();
    this.setUserPrivilage(Pages.ProjectProfile,SystemActions.ViewProject);
    const injector = AppInjector.getInjector();
    this.modalService = injector.get(NgbModal);
  }

  ngOnInit(): void { }

  openMyWorkNotesActivities(projectId: number) {
    const modalRef = this.modalService.open(MyWorkNotesActivitiesComponent, {
      modalDialogClass: 'crud-process',
    });
    modalRef.componentInstance.projectId = projectId;
  }
}
