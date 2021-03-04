import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Boards } from '../models/boards';
import { Task } from '../models/tasks';
import { BoardsService } from '../services/boards.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnsService } from '../services/columns.service';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.scss']
})
export class CardCreateComponent implements OnInit {

  myForm: FormGroup = new FormGroup({
    "name": new FormControl("", Validators.required),
    "description": new FormControl("", Validators.required),
    "date": new FormControl("", Validators.required),
    "comment": new FormControl(""),
  });

  submit() {
    console.log(this.myForm);
  }

  minDate = new Date();

  constructor(
    public dialogRef: MatDialogRef<CardCreateComponent>,
    public boardsService: BoardsService,
    public columnsService: ColumnsService,
    public cardsService: CardsService,
    private toastr: ToastrService,
    @Inject (MAT_DIALOG_DATA) public data: Boards
  ) { }

  board:any;
  ngOnInit(): void {
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

  addCard(name, description, date, comment) {
    this.cardsService.addCard(
      this.board.my_board._id,
      this.board.my_column._id,
      { name, description, date, comment } as Task
    )
      .subscribe(card => {
        this.onClose(),
          this.createSuccess();
      }, err => {
        this.createError();
      })
  }

}
