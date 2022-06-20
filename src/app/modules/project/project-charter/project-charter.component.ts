import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor, Toolbar } from 'ngx-editor';
import { ProjectCharter } from 'src/app/@AppService/models/project-charter.mode';
import { ApiResponse } from 'src/app/@AppService/models/response.model';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';

@Component({
  selector: 'app-project-charter',
  templateUrl: './project-charter.component.html'
})
export class ProjectCharterComponent extends BaseComponent implements OnInit { 
  projectId: number;
  formGroup: FormGroup;

  summaryEditor: Editor = new Editor();
  goalsEditor: Editor = new Editor();
  deliverablesEditor: Editor = new Editor();
  scopeEditor: Editor = new Editor();
  benefitsEditor: Editor = new Editor();
  costsEditor: Editor = new Editor();
  misalignmentsEditor: Editor = new Editor();

  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link"],
    ["text_color", "background_color"]
  ];

  constructor(
    private fb: FormBuilder,
    public projectService: ProjectService,
    public modal: NgbActiveModal) { super(); }

  ngOnInit(): void {
    this.loadForm();
    this.getProjectCharterById();
  }

  ngOnDestroy(): void {
    this.summaryEditor.destroy();
    this.goalsEditor.destroy();
    this.deliverablesEditor.destroy();
    this.scopeEditor.destroy();
    this.benefitsEditor.destroy();
    this.costsEditor.destroy();
    this.misalignmentsEditor.destroy();
  }

  loadForm(): void {
    this.formGroup = this.fb.group({
      projectId: [],
      summary: [],
      goals: [],
      deliverables: [],
      scope: [],
      benefits: [],
      costs: [],
      misalignments: [],
    });
  }

  getProjectCharterById() {
    if (this.projectId) {
      this.projectService.getProjectCharter(this.projectId).subscribe(
        response => this.getProjectCharterByIdOnSuccess(response),
        error => this.showErrorMessages(error.error.errors)
      );
    }
  }

  getProjectCharterByIdOnSuccess(response: ApiResponse<ProjectCharter>): void {
    this.formGroup.patchValue(response.result.responseData);
  }

  save(): void {
    let projectCharter: ProjectCharter;
    projectCharter = this.formGroup.value;
    projectCharter.projectId = this.projectId;

    this.projectService.updateProjectCharter(projectCharter).subscribe(
      response => this.updateProjectCharterOnSuccess(response),
      error => this.showErrorMessages(error.error.errors)
    )
  }
  updateProjectCharterOnSuccess(response: ApiResponse<ProjectCharter>): void {
    this.showSuccessMessage(response.result.commandMessage);
    this.modal.close();
  }
}
