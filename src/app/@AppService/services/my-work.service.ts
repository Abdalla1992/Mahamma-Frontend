import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Note } from "../models/my-work/note.model";
import { ApiResponse, Result } from "../models/response.model";
import { BaseService } from "./Base/base.service";
import { GenericService } from "./Base/GenericService";
import { UserTasksInfo } from "../models/my-work/user-tasks-info.model";

@Injectable({
  providedIn: 'root',
})
export class MyWorkService extends BaseService<Note, Note>{
  
  constructor(
    @Inject(HttpClient) http,
    private genericService: GenericService) {
    super(http);
  }

  getNoteList(): Observable<ApiResponse<Note[]>> {
    return this.http.get<ApiResponse<Note[]>>(
      environment.mahammaApiBaseUrl + "MyWork/GetAllNotes");
  }

  addNote(note: Note): Observable<ApiResponse<Note>>{
    return this.genericService.post<ApiResponse<Note>>(environment.mahammaApiBaseUrl + "MyWork/AddNote", note);
  }

  deleteNote(note: Note): Observable<ApiResponse<Note>>{
    return this.genericService.post<ApiResponse<Note>>(environment.mahammaApiBaseUrl + "MyWork/DeleteNote", note);
  }
  updateNoteColor(note: Note) : Observable<ApiResponse<Note>>{
    return this.genericService.post<ApiResponse<Note>>(environment.mahammaApiBaseUrl + "MyWork/UpdateNoteColor", note);
  }

  getUserTasksInfo(): Observable<ApiResponse<UserTasksInfo>> {
    return this.http.get<ApiResponse<UserTasksInfo>>(
      environment.mahammaApiBaseUrl + "MyWork/GetUserTasksInfo");
  }

  
}