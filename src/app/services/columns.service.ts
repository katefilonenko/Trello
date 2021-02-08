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

  private columnsUrl = 'http://localhost:7070/columns'

  getColumns(){
    return this.http.get(this.columnsUrl);
  }

  getColumn(id){
    const url = `${this.columnsUrl}/${id}`;
    return this.http.get(url);
  }

  addColumn(data){
    return this.http.post(this.columnsUrl, data);
  }

  deleteColumn(id){
    const url = `${this.columnsUrl}/${id}`;
    return this.http.delete(url);
  }

  updateColumn(id, data){
    const url = `${this.columnsUrl}/${id}`;
    return this.http.put(url, data);
  }

  myForm: FormGroup = new FormGroup({
    "name": new FormControl("", Validators.required)
  });

  populateForm(column){
    this.myForm.patchValue(column);
    console.log(column)
  }
}
