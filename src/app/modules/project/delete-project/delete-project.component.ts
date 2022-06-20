import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/@AppService/models/response.model';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss']
})
export class DeleteProjectComponent extends BaseComponent implements OnInit {

  @Input() name;
  @Input() workSpaceId;

  constructor(public activeModal: NgbActiveModal,
    private projectService: ProjectService) { super(); }

  ngOnInit(): void {
  }

  
}
