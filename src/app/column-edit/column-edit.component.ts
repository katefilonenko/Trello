import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Boards } from '../models/boards';
import { Columns } from '../models/columns';
import { ColumnsService } from '../services/columns.service';

@Component({
  selector: 'app-column-edit',
  templateUrl: './column-edit.component.html',
  styleUrls: ['./column-edit.component.scss']
})
export class ColumnEditComponent implements OnInit {

  myForm: FormGroup = new FormGroup({
    "name": new FormControl("", Validators.required)
  });

  submit() {
    console.log(this.myForm);
  }

  constructor(
    public dialogRef: MatDialogRef<ColumnEditComponent>,
    private toastr: ToastrService,
    public columnsService: ColumnsService,
    @Inject (MAT_DIALOG_DATA) public data: Boards
  ) { }

  array:any;
  ngOnInit(): void {
    this.array = this.data;
    console.log(this.array);
    console.log(this.array.my_board._id, this.array.my_column._id)
  }

  onClose() {
    this.dialogRef.close();
  }

  editSuccess() {
    this.toastr.success('Updated', 'Success');
  }

  editError(){
    this.toastr.error('Name must be unique', 'Major Error');
  }

  updateColumn(name){
    name = name.trim();
    if (!name) { return; }
    if(this.array.my_column.name == name){
      this.onClose();
    }
    else{
      console.log('hfhfhhf')
      this.columnsService.updateColumn(
        this.array.my_board._id, 
        this.array.my_column._id, 
        {name} as Columns
      )
      .subscribe(res => {
        this.onClose();
        this.editSuccess();
      }, err => {
        this.editError();
      })
    }
  }

}
