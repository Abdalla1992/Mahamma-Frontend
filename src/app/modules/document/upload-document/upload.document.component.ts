import { FileContent } from 'src/app/@AppService/models/file-content.model';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/@AppService/services/auth.service';
import { TaskService } from 'src/app/@AppService/services/task/task.service';
import { BaseComponent } from 'src/app/@core/Component/baseComponent/baseComponent';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload.document.component.html',
  styleUrls: ['./upload.document.component.scss'],
})
export class UploadDocumentComponent extends BaseComponent implements OnInit {
  @Input() multipleFiles: boolean = true;
  @Output() filesUploaded = new EventEmitter<FileContent[]>();
  file: File[] = [];
  uploadedFiles: FileContent[] = [];
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(public authService: AuthService, public _http: HttpClient) {
    super();
  }

  ngOnInit() {}

  onSelect(event: { addedFiles: File[] }) {

    if (event.addedFiles && event.addedFiles.length > 0) {
      event.addedFiles.forEach((file) => {
        this.processWebDataFile(file);
      });
    }  
  }

  processWebDataFile(webFile: File) {
    if (webFile) {
      //this.imageRemoved = false;
      // this.webImageInfo.fileName = this.webFile.name;
      // this.webImageInfo.fileExtention = this.webFile.type;
      // const size = this.webFile.size / Math.log(1024);
      // this.webImageInfo.fileSize = Math.round(size).toString() + ' KB';

      this.authService.uploadFile(webFile).subscribe(
        (event) => {
          if (event) {
            event.actualFileName = webFile.name;
            this.uploadedFiles.push(event);
          }
          this.filesUploaded.emit(this.uploadedFiles);
          this.uploadedFiles=[];
        },
        (err) => {
          this.errorOccured(err);
        }
      );
    }
  }

  onRemove(event: File) {
    console.log(event);
    this.file.splice(this.file.indexOf(event), 1);
  }
}
