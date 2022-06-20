import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-folder',
  templateUrl: './view-folder.component.html',
  styleUrls: ['./view-folder.component.scss']
})
export class ViewFolderComponent implements OnInit {

  projectId: number;
  taskId?: number;
  folderId?: number;

  constructor(protected activatedRoute: ActivatedRoute) { 

    this.projectId = this.activatedRoute.snapshot.queryParams['projectId'];
    this.taskId = this.activatedRoute.snapshot.queryParams['taskId'];
    this.folderId = this.activatedRoute.snapshot.queryParams['folderId'];
  }

  ngOnInit(): void {
  }

}
