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

  Name: string;

  myForm: FormGroup = new FormGroup({
    "name": new FormControl("", Validators.required)
  });

  // submit() {
  //   console.log(this.myForm);
  // }

  constructor(
    public dialogRef: MatDialogRef<BoardEditComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Boards,
    public boardsService: BoardsService
  ) { }

  board:any;

  ngOnInit(): void {
    this.board = this.data;
    // console.log(this.board.name);
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

  updateBoard(name){
    // console.log(name);
    if(this.board.name == name){
      this.onClose();
    }
    else{
      this.boardsService.findAndUpdateBoard(this.board._id, {name} as Boards)
    .subscribe(board => {
      console.log(this.board._id);      
      console.log(this.board);
      this.onClose();
      this.editSuccess();
    }, err => {
      this.editError();
    })
    }
    
  }

}
