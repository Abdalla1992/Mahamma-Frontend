import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pages, SystemActions } from 'src/app/@AppService/Enums/security';
import { Note } from 'src/app/@AppService/models/my-work/note.model';
import { Project } from 'src/app/@AppService/models/project.model';
import { MyWorkService } from 'src/app/@AppService/services/my-work.service';
import { ProjectService } from 'src/app/@AppService/services/project.service';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';
import { BaseListComponent } from 'src/app/@core/Component/baseComponent/baseListComponent';
import { AppInjector } from 'src/app/@core/Injector/app-injectore';
import { AddTaskComponent } from '../../task/add-task/add-task.component';
import { MyWorkAddNewNoteComponent } from '../my-work-add-new-note/my-work-add-new-note.component';

@Component({
  selector: 'app-my-work-notes-section',
  templateUrl: './my-work-notes-section.component.html'
})
export class MyWorkNotesSectionComponent extends BaseListComponent<Note, Note> {
  @Input() project: Project;
  @Output() onUpdateProject = new EventEmitter<any>();

  noteList: Note[];

  constructor(public projectService: ProjectService,
              public modal: NgbActiveModal,
              private myWorkService: MyWorkService) {
    super(myWorkService);
    this.setUserPrivilage(Pages.ProjectProfile, SystemActions.ViewProject);
    const injector = AppInjector.getInjector();
    this.modalService = injector.get(NgbModal);
  }
  
  ngOnInit(): void {
    this.getAllNotes();
  }

  openMyWorkAddNewNote(projectId: number) {
    const modalRef = this.modalService.open(MyWorkAddNewNoteComponent, {
      modalDialogClass: 'crud-process',
    });
    modalRef.result.then((response) => this.getAllNotes());
  }

  colors = ['#FFFABA', '#C7FE80', '#E1BBFC', '#FF7139', '#FFE08A']
  noteBackground: string = '#FFFABA'

  getAllNotes() {
    this.myWorkService.getNoteList().subscribe(
      res => this.noteList = res.result.responseData,
      error => this.showErrorMessages(error.error.errors)
    );
  }

  deleteNote(note: Note) {
    this.myWorkService.deleteNote(note).subscribe(
      res => this.getAllNotes(),
      error => this.showErrorMessages(error.error.errors)
    );
  }

  updateNoteColor(note: Note, newColor: string) {
    note.colorCode = newColor;

    this.myWorkService.updateNoteColor(note).subscribe(
      res => this.updateNoteColorOnSuccess(res),
      error => this.showErrorMessages(error.error.errors)
    );
  }

  updateNoteColorOnSuccess(res: any) {
    this.showSuccessMessage(res.result.commandMessage);
  }

  createNewTask(taskName: string, description: string) {
    this.OpenPopUp(AddTaskComponent, { modalDialogClass: 'crud-process' }, [
      ['projectId', 0],
      ['taskName', taskName],
      ['description', description]
    ]);
  }

  filter(){}
  filterForm(){}
}
