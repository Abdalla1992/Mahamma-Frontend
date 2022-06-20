import { ProjectService } from './../../../@AppService/services/project.service';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/@AppService/models/project.model';
import { MemberModel } from 'src/app/@AppService/models/search.member.model';
import { BaseAddEditComponent } from 'src/app/@core/Component/baseComponent/baseAddEditComponent';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rate-project-member',
  templateUrl: './rate-project-member.component.html',
  styleUrls: ['./rate-project-member.component.scss'],
})
export class RateProjectMemberComponent
  extends BaseAddEditComponent<Project, Project>
  implements OnInit
{
  @Input() projectMembers: MemberModel[];
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public projctService: ProjectService,
    public modal: NgbActiveModal
  ) {
    super(projctService, modal);
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm(): void {
    this.formGroup = this.fb.group({});
  }
  prepareEntity(): void {
    throw new Error('Method not implemented.');
  }
  clearEntity(): void {
    throw new Error('Method not implemented.');
  }
  emptyEntity(): Project {
    throw new Error('Method not implemented.');
  }
  emptyResponseEntity(): Project {
    throw new Error('Method not implemented.');
  }

  cancelRate() {
    this.modal.close();
  }
}
