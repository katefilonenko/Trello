import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardsService } from '../services/cards.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Boards } from '../models/boards';
import { Task } from '../models/tasks';
import { LoaderService } from '../laoder/loader.service';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss']
})
export class CardEditComponent implements OnInit {

  myForm: FormGroup = new FormGroup({
    "name": new FormControl("", Validators.required),
    "description": new FormControl("", Validators.required),
    "date": new FormControl("", Validators.required),
    "comment": new FormControl(""),
  });

  submit() {
    console.log(this.myForm);
  }

  constructor(
    public dialogRef: MatDialogRef<CardEditComponent>,
    public cardsService: CardsService,
    private toastr: ToastrService,
    @Inject (MAT_DIALOG_DATA) public data: Boards,
    public loaderService: LoaderService
  ) { }

  board:any;
  ngOnInit(): void {
    this.board = this.data;
    console.log(this.board)
    this.func();
  }

  minDate
  func() {
    const date = this.board.my_task.date;
    console.log(date)
    this.minDate = new Date(date);
    console.log(this.minDate)
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

  refreshPage() {
    window.location.reload();
  }

  updateCard(name, description, date, comment){
    if(this.board.my_task.name == name){
      this.onClose();
    }
    else{
      this.cardsService.updateCard(
        this.board.my_board._id, 
        this.board.my_column._id, 
        this.board.my_task._id, 
        {name, description, date, comment} as Task
      )
      .subscribe(res => {
        this.onClose();
        // this.refreshPage();
        this.editSuccess();
      }, err => {
        this.editError();
      })
    }
    
  }

}
