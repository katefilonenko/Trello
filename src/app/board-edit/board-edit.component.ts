import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Boards } from '../models/boards'
import { BoardsService } from '../services/boards.service';

@Component({
  selector: 'app-board-edit',
  templateUrl: './board-edit.component.html',
  styleUrls: ['./board-edit.component.scss']
})
export class BoardEditComponent implements OnInit {

  myForm: FormGroup = new FormGroup({
    "name": new FormControl("", Validators.required)
  });

  submit() {
    console.log(this.myForm);
  }

  constructor(
    public dialogRef: MatDialogRef<BoardEditComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Boards,
    public boardsService: BoardsService
  ) { }

  board:any;

  ngOnInit(): void {
    this.board = this.data;
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

  updateBoard(){
    this.boardsService.findAndUpdateBoard(this.board._id, this.board)
    .subscribe(board => {
      console.log(this.board._id);
      console.log(this.board)
      this.onClose();
      this.editSuccess();
    }, err => {
      this.editError();
    })
  }

}
