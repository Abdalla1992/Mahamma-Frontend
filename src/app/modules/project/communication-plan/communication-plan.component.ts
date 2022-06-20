import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectCommunicationPlan } from 'src/app/@AppService/models/project-communication-plan.model';
import { Project } from 'src/app/@AppService/models/project.model';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';

@Component({
  selector: 'app-communication-plan',
  templateUrl: './communication-plan.component.html'
})
export class CommunicationPlanComponent extends BaseComponent implements OnInit {
  project: Project;
  isReadOnly: boolean;
  formGroup: FormGroup;
  communicationPlans: ProjectCommunicationPlan[];

  constructor(private projectService: ProjectService,
    private fb: FormBuilder) { super(); }

  ngOnInit(): void {
    this.getProjectById();
    this.loadForm();
    this.getAllCommunicationPlans();
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
      recipient: [''],
      communicationType: [''],
      frequency: [''],
      owner: [''],
      keyDates: [''],
      deliveryMethod: [''],
      goal: [''],
      resourceLinks: [''],
      notes: [''],
    });
  }

  getAllCommunicationPlans() {
    this.projectService.getAllCommunicationPlans(this.project.id).subscribe(
      response => this.communicationPlans = response.result.responseData,
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
    this.projectService.deleteCommunicationPlan(planId).subscribe(
      response => this.saveOnSuccess(response),
      error => this.showErrorMessages(error.error.errors)
    );

  }

  save(): void {
    let projectCommunicationPlan: ProjectCommunicationPlan = this.formGroup.value;

    if (projectCommunicationPlan.communicationType == '' && projectCommunicationPlan.deliveryMethod == '' &&
      projectCommunicationPlan.goal == '' && projectCommunicationPlan.frequency == '' &&
      projectCommunicationPlan.keyDates == '' && projectCommunicationPlan.notes == '' &&
      projectCommunicationPlan.recipient == '' && projectCommunicationPlan.owner == '' &&
      projectCommunicationPlan.resourceLinks == '') {
      this.showErrorMessage("Please fill at least one field");
      return;
    }

    if (projectCommunicationPlan.id && projectCommunicationPlan.id > 0) {
      this.projectService.updateCommunicationPlan(projectCommunicationPlan).subscribe(
        response => this.saveOnSuccess(response),
        error => this.showErrorMessages(error.error.errors)
      );
    }
    else {
      this.projectService.addCommunicationPlan(projectCommunicationPlan).subscribe(
        response => this.saveOnSuccess(response),
        error => this.showErrorMessages(error.error.errors)
      );
    }
  }

  saveOnSuccess(response: any) {
    this.getAllCommunicationPlans();
    this.showSuccessMessage(response.result.commandMessage);
    this.loadForm();
  }

}
