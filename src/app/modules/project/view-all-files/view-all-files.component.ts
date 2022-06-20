import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectAttachment } from 'src/app/@AppService/models/project.attachment.model';
import { TaskService } from 'src/app/@AppService/services/task/task.service';

@Component({
  selector: 'app-view-all-files',
  templateUrl: './view-all-files.component.html',
  styleUrls: ['./view-all-files.component.scss']
})
export class ViewAllFilesComponent implements OnInit {

  taskId : number;
  file: File[] = [];
  fileUrlList : ProjectAttachment[] = [];
  
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(public http: HttpClient,
    private route: ActivatedRoute,
    private taskService: TaskService)
  {
    this.taskId = Number(JSON.parse(this.route.snapshot.paramMap.get('id') || '0'));
    this.taskService.GetTaskFiles(this.taskId).subscribe(task => 
      {
        this.fileUrlList = task.result.responseData
      });
  }
  
  ngOnInit(): void {
  }

	onSelect(event: { addedFiles: any; }) {
		console.log(event);
		this.file.push(...event.addedFiles);

    const fileUpload = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file',fileUpload);

    this.http.post('http://localhost:58089/', file).subscribe(response =>{
      console.log(response)
    })

	}

	onRemove(event: File) {
		console.log(event);
		this.file.splice(this.file.indexOf(event), 1);
	}

}
