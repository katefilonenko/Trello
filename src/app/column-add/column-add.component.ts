import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Boards } from '../models/boards';
import { Columns } from '../models/columns';
import { BoardsService } from '../services/boards.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColumnsService } from '../services/columns.service';

@Component({
  selector: 'app-column-add',
  templateUrl: './column-add.component.html',
  styleUrls: ['./column-add.component.scss']
})
export class ColumnAddComponent implements OnInit {

  myForm: FormGroup = new FormGroup({
    "name": new FormControl("", Validators.required)
  });

  submit() {
    console.log(this.myForm);
  }

  constructor(
    public dialogRef: MatDialogRef<ColumnAddComponent>,
    public boardsService: BoardsService,
    public columnsService: ColumnsService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    @Inject (MAT_DIALOG_DATA) public data: Boards
  ) { }

  board:any;
  ngOnInit(): void {
    // this.getBoard(this.route.snapshot.paramMap.get('id'));
    this.board = this.data;
    console.log(this.board)
  }


  onClose() {
    this.dialogRef.close();
  }

  createSuccess() {
    this.toastr.success('Created', 'Success');
  }

  createError(){
    this.toastr.error('Name must be unique', 'Major Error');
  }

  // boards;
  // columns:any;
  // getBoard(id){
  //   this.boardsService.getBoard(id)
  //   .subscribe(boards => {
  //     this.boards = boards;
  //     this.columns = this.boards.columns;
  //     console.log(boards);
  //     console.log(this.columns);
  //   })
  // }

  addColumn(name){
    this.columnsService.addColumn(this.board._id, {name} as Columns)
    .subscribe(column => {
      this.onClose();
      this.createSuccess();
    }, err => {
      console.log(err)
      this.createError();
    })
  }

}
