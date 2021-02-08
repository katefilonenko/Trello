import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BoardsService } from '../services/boards.service';
import { Boards } from '../models/boards'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-board-create',
  templateUrl: './board-create.component.html',
  styleUrls: ['./board-create.component.scss']
})
export class BoardCreateComponent implements OnInit {

  boards: Boards[];

  myForm: FormGroup = new FormGroup({
    "name": new FormControl("", Validators.required)
  });

  submit() {
    console.log(this.myForm);
  }

  constructor(
    public dialogRef: MatDialogRef<BoardCreateComponent>,
    private toastr: ToastrService,
    private boardsService: BoardsService
  ) { }

  ngOnInit(): void {
    this.getAllInfo();
  }

  createSuccess() {
    this.toastr.success('Created', 'Success');
  }

  createError(){
    this.toastr.error('Not Created', 'Major Error');
  }

  onClose() {
    this.dialogRef.close();
  }

  getAllInfo(){
    this.boardsService.getBoards()
    .subscribe(boards=>{
      this.boards = boards as Boards[];
    })
  }

  addBoard(name: string){
    this.boardsService.addBoard({name} as Boards)
    .subscribe(board => {
      // this.boards.push(board);
      this.onClose();
      this.createSuccess();
    }, err => {
      console.log(err)
      this.createError();
    })
  }
}
