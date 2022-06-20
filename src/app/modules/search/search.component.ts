import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  searchKeyword: string;

  showAll: boolean = true;
  showWorkspace : boolean = true;
  showProject : boolean = true;
  showMember : boolean = true;
  showTask : boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }
  
  showAllCategories(): void {
    this.showAll = true;
    this.showWorkspace = true;
    this.showProject = true;
    this.showMember = true;
    this.showTask = true;
  }

  hideAllCategories(): void {
    this.showAll = false;
    this.showWorkspace = false;
    this.showProject = false;
    this.showMember = false;
    this.showTask = false;
  }

  allIsHiden(): boolean {
    return this.showWorkspace == false && this.showProject == false && this.showMember == false && this.showTask == false;
  }

  toggleWorkspace(): void {
    if(this.showAll)
    {
      this.hideAllCategories();
    }
    this.showWorkspace = !this.showWorkspace;
    if(this.allIsHiden())
    {
      this.showAllCategories();
    }
  }

  toggleProject(): void {
    if(this.showAll)
    {
      this.hideAllCategories();
    }
    this.showProject = !this.showProject;
    if(this.allIsHiden())
    {
      this.showAllCategories();
    }
  }

  toggleMember(): void {
    if(this.showAll)
    {
      this.hideAllCategories();
    }
    this.showMember = !this.showMember;
    if(this.allIsHiden())
    {
      this.showAllCategories();
    }
  }

  toggleTask(): void {
    if(this.showAll)
    {
      this.hideAllCategories();
    }
    this.showTask = !this.showTask;
    if(this.allIsHiden())
    {
      this.showAllCategories();
    }
  }
}
