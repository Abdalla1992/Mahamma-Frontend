import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectAttachment } from 'src/app/@AppService/models/project.attachment.model';
import { TaskService } from 'src/app/@AppService/services/task/task.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
  ngOnInit() {}
}
