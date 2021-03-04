import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Boards } from '../models/boards';
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // private boardsUrl = 'api/boards';

  private boardsUrl = 'http://localhost:7070/boards2'

  // getBoards(): Observable<Boards[]>{
  //   return this.http.get<Boards[]>(this.boardsUrl);
  // }

  getBoards(){
    return this.http.get(this.boardsUrl);
  }

  // getBoard(id): Observable<Boards> {
  //   const url = `${this.boardsUrl}/${id}`
  //   return this.http.get<Boards>(url);
  // }

  getBoard(id){
    const url = `${this.boardsUrl}/${id}`;
    return this.http.get(url);
  }

  // addBoard(board: Boards): Observable<Boards>{
  //   return this.http.post<Boards>(this.boardsUrl, board, this.httpOptions)
  // }

  addBoard(data){
    return this.http.post(this.boardsUrl, data);
  }

  findAndUpdateBoard(id, data){
    const url = `${this.boardsUrl}/${id}`;
    return this.http.put(url, data);
  }

  updateBoard(id, data){
    const url = `${this.boardsUrl}/${id}`;
    return this.http.put(url, data);
  }

  deleteBoard(id){
    const url = `${this.boardsUrl}/${id}`;
    return this.http.delete(url);
  }

  searchBoards(term: string): Observable<Boards[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Boards[]>(`${this.boardsUrl}/name=${term}`)
    .pipe(
      tap(x => x.length ?
        console.log(`found heroes matching "${term}"`) :
        console.log(`no heroes matching "${term}"`)),
     catchError(this.handleError<Boards[]>('searchBoards', []))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  myForm: FormGroup = new FormGroup({
    "name": new FormControl("", Validators.required)
  });

  populateForm(board){
    this.myForm.patchValue(board);
    // console.log(board)
  }
}
