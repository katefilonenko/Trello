import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {

  constructor(
    private http: HttpClient,
  ) { }

  private columnsUrl = 'http://localhost:7070/columns2'

  getColumns(){
    return this.http.get(this.columnsUrl);
  }

  getColumn(bid, cid){
    const url = `${this.columnsUrl}/${bid}/${cid}`;
    return this.http.get(url);
  }

  addColumn(id, data){
    const url = `${this.columnsUrl}/${id}`;
    return this.http.post(url, data);
  }

  deleteColumn(bid, cid){
    const url = `${this.columnsUrl}/${bid}/${cid}`;
    return this.http.delete(url);
  }

  updateColumn(bid, cid, data){
    const url = `${this.columnsUrl}/${bid}/${cid}`;
    return this.http.put(url, data);
  }

  myForm: FormGroup = new FormGroup({
    "name": new FormControl("", Validators.required)
  });

  populateForm(column){
    this.myForm.patchValue(column);
    // console.log(column)
  }
}
