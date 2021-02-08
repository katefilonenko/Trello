import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    // public data: Boards
  ) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

  editSuccess() {
    this.toastr.success('Updated', 'Success');
  }

  editError(){
    this.toastr.error('Not Updated', 'Major Error');
  }

  updateColumn(){
    // this.columnsService.updateColumn()
  }

}
