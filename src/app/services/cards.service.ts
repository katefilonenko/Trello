import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Boards } from '../models/boards';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(
    private http: HttpClient,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private tasksUrl = 'http://localhost:7070/tasks2';
  private replaceTaskUrl = 'http://localhost:7070/replaceTask';

  addCard(bid, cid, data){
    const url = `${this.tasksUrl}/${bid}/${cid}`;
    return this.http.post(url, data);
  }

  replaceCard(bid, cid, data){
    const url = `${this.replaceTaskUrl}/${bid}/${cid}`;
    return this.http.post(url, data);
  }

  deleteCard(bid, cid, tid){
    const url = `${this.tasksUrl}/${bid}/${cid}/${tid}`;
    return this.http.delete(url);
  }
  
  // updateCard(bid, cid, tid, data):Observable<any>{
  //   const url = `${this.tasksUrl}/${bid}/${cid}/${tid}`;
  //   return this.http.put(url, data).pipe(
  //     tap(_ => console.log(`updated card`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }

  updateCard(bid, cid, tid, data){
    const url = `${this.tasksUrl}/${bid}/${cid}/${tid}`;
    return this.http.put(url, data);
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
    "name": new FormControl("", Validators.required),
    "description": new FormControl("", Validators.required),
    "date": new FormControl("", Validators.required),
    "comment": new FormControl(""),
  });

  populateForm(task){
    this.myForm.patchValue(task);
    console.log(task)
  }
}
