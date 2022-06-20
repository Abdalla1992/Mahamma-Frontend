import { NotExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MyWorkService } from 'src/app/@AppService/services/my-work.service';
import { Note } from 'src/app/@AppService/models/my-work/note.model';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';

@Component({
  selector: 'app-my-work-add-new-note',
  templateUrl: './my-work-add-new-note.component.html'
})
export class MyWorkAddNewNoteComponent extends BaseComponent implements OnInit {

  colors = ['#FFFABA', '#C7FE80', '#E1BBFC', '#FF7139', '#FFE08A'];
  formGroup: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private myWorkService: MyWorkService) {
      super();
  }
  ngOnInit(): void {
    this.loadForm();
  }

  loadForm(): void {
    this.formGroup = this.fb.group({
      id: 0,
      title: '',
      body: '',
      colorCode: '#FFFABA',
      isTask: false,
      ownerId: 0,
      ownerName: '',
    });
  }

  pickColor(color: string){
    this.formGroup.get('colorCode')?.setValue(color);
  }

  submit() {
    let note: Note;
    note = this.formGroup.value;

    if (note.title == '' && note.title == '' &&
      note.body == '' && note.body == '') {
      this.showErrorMessage("Please fill required fields");
      return;
    }

    this.myWorkService.addNote(note).subscribe(
      res => {
        this.showSuccessMessage(res.result.commandMessage);
        this.modal.close();
      },
      err => this.showErrorMessage(err.result.commandMessage)
    )
  }
}
