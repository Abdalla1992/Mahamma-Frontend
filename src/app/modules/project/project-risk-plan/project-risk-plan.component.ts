import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectRiskPlan } from 'src/app/@AppService/models/project-risk-plan.model';
import { Project } from 'src/app/@AppService/models/project.model';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';

@Component({
  selector: 'project-risk-plan',
  templateUrl: './project-risk-plan.component.html'
})
export class ProjectRiskPlanComponent extends BaseComponent implements OnInit {
  project: Project;
  isReadOnly: boolean;
  formGroup: FormGroup;

  riskPlans: ProjectRiskPlan[];
  
  constructor(private projectService: ProjectService,
    private fb: FormBuilder) { super(); }

  ngOnInit(): void {
    this.getProjectById();
    this.loadForm();
    this.getAllRiskPlans();
  }

  getProjectById() {
    this.project = {} as Project;
    this.project.id = this.projectService.projectId;

    this.projectService.getItemById(this.project.id).subscribe(
      res => this.project = res.result.responseData,
      err => this.showErrorMessages(err.error.errors)
    );
  }

  loadForm(): void {
    this.formGroup = this.fb.group({
      id: [0],
      projectId: [this.project.id],
      issue: [''],
      impact: [''],
      action: [''],
      owner: ['']
    });
  }

  getAllRiskPlans() {
    this.projectService.getAllRiskPlans(this.project.id).subscribe(
      response => this.riskPlans = response.result.responseData,
      error => this.showErrorMessages(error.error.errors)
    );
  }

  createNewPlan() {
    this.loadForm();
  }

  updatePlan(plan: any) {
    this.formGroup.patchValue(plan);
  }

  deletePlan(planId: number) {
    this.projectService.deleteRiskPlan(planId).subscribe(
      response => this.saveOnSuccess(response),
      error => this.showErrorMessages(error.error.errors)
    );

  }

  save(): void {
    let projectRiskPlan: ProjectRiskPlan = this.formGroup.value;

    if (projectRiskPlan.issue == '' && projectRiskPlan.impact == '' &&
      projectRiskPlan.action == '' && projectRiskPlan.owner == '') {
      this.showErrorMessage("Please fill at least one field");
      return;
    }

    if (projectRiskPlan.id && projectRiskPlan.id > 0) {
      this.projectService.updateRiskPlan(projectRiskPlan).subscribe(
        response => this.saveOnSuccess(response),
        error => this.showErrorMessages(error.error.errors)
      );
    }
    else {
      this.projectService.addRiskPlan(projectRiskPlan).subscribe(
        response => this.saveOnSuccess(response),
        error => this.showErrorMessages(error.error.errors)
      );
    }
  }

  saveOnSuccess(response: any){
    this.getAllRiskPlans();
    this.showSuccessMessage(response.result.commandMessage);
    this.loadForm();
  }

}