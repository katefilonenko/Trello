import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Boards } from '../models/boards';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(
    private http: HttpClient,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private boardsUrl = 'api/boards';

  getBoards(): Observable<Boards[]>{
    return this.http.get<Boards[]>(this.boardsUrl);
  }

  getBoard(id): Observable<Boards> {
    const url = `${this.boardsUrl}/${id}`
    return this.http.get<Boards>(url);
  }

  addBoard(board: Boards): Observable<Boards>{
    return this.http.post<Boards>(this.boardsUrl, board, this.httpOptions)
  }

  // getTasks()
}
