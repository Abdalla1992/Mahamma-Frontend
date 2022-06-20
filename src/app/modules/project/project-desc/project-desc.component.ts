import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-project-desc',
  templateUrl: './project-desc.component.html',
  styleUrls: ['./project-desc.component.scss']
})
export class ProjectDescComponent implements OnInit {

  ngOnInit(): void {
  }

  file: File[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(public http: HttpClient){}

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
