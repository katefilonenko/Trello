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
    // console.log(this.myForm);
  }

  constructor(
    public dialogRef: MatDialogRef<CardEditComponent>,
    public cardsService: CardsService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Boards,
    public loaderService: LoaderService
  ) { }

  board: any;
  ngOnInit(): void {
    this.board = this.data;
    console.log(this.board)
    this.func();
  }

  minDate
  func() {
    const date = this.board.my_task.date;
    // console.log(date)
    this.minDate = new Date();
    // this.minDate = new Date(date);
    // console.log(this.minDate)
  }

  onClose() {
    this.dialogRef.close();
  }

  editSuccess() {
    this.toastr.success('Updated', 'Success');
  }

  editError() {
    this.toastr.error('Name must be unique', 'Major Error');
  }

  refreshPage() {
    window.location.reload();
  }

  updateCard(name, description, date, comment) {
    const myMonth = this.minDate.getMonth() + 1;
    const myDay = this.minDate.getDate();
    const myYear = this.minDate.getFullYear();
    const fullDate = myMonth + "/" + myDay + "/" + myYear;
    name = name.trim();
    if (!name) { return; }
    if (
      this.board.my_task.name == name &&
      this.board.my_task.description == description &&
      fullDate == date &&
      this.board.my_task.comment == comment) {
      this.onClose();
    } else {
      if (this.board.my_task.name == name) {
        console.log(this.board.my_task.name)
        this.cardsService.forCard(this.board.my_board._id,
          this.board.my_column._id,
          this.board.my_task._id,
          { name, description, date, comment } as Task)
          .subscribe(res => {
            console.log(name,  description, date, comment )
            this.onClose();
            this.editSuccess();
          }, err => {
            this.editError();
          })
          
        
        // this.board.my_column.tasks.forEach(element => {
        //   this.cardsService.deleteCard(this.board.my_board._id,
        //     this.board.my_column._id,
        //     element._id)
        //     .subscribe(res => {
        //     })
        // });
        // this.board.my_column.tasks.forEach(element => {
        //   if (this.board.my_task._id == element._id) {
        //     console.log(element)
        //     // this.element1 = element;
            
        //     this.cardsService.addCard(this.board.my_board._id, this.board.my_column._id, { name, description, date, comment } as Task)
        //       .subscribe(card => { })
        //   }
        //   // else {
        //     if (this.board.my_task._id !== element._id) {
        //     console.log(element)
        //     const name = element.name;
        //     const description = element.description;
        //     const date = element.date;
        //     const comment = element.comment;
        //       // this.element1 = element;
        //       // const name = this.element1.name;
        //       // const description = this.element1.description;
        //       // const date = this.element1.date;
        //       // const comment = this.element1.comment;
        //       this.cardsService.replaceCard(this.board._id, this.board.my_column._id, { name, description, date, comment } as Task)
        //         .subscribe(card => { })
        //     }
        //   // }

        // });
        // this.onClose();
        // console.log(this.board.my_task);
        
        // this.cardsService.deleteCard(this.board.my_board._id,
        //   this.board.my_column._id,
        //   this.board.my_task._id)
        //   .subscribe(res => {
        //     name = name.trim();
        //     if (!name) { return; }
        //     this.cardsService.addCard(this.board.my_board._id, this.board.my_column._id, { name, description, date, comment } as Task)
        //       .subscribe(card => {
        //         this.onClose(),
        //           this.editSuccess();
        //       }, err => {
        //         this.editError();
        //       })
        //   })
      } else {
        this.cardsService.updateCard(
          this.board.my_board._id,
          this.board.my_column._id,
          this.board.my_task._id,
          { name, description, date, comment } as Task
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

  deleteInfo(){
    this.board.my_column.tasks.forEach(element => {
      this.cardsService.deleteCard(this.board.my_board._id,
        this.board.my_column._id,
        element._id)
        .subscribe(res => {
        })
    });
    this.addNew();
  }
  
  element1;
  addNew() {
    this.board.my_column.tasks.forEach(element => {
      if (this.board.my_task._id !== element._id) {
        console.log(element)
        this.element1 = element;
        const name = this.element1.name;
        const description = this.element1.description;
        const date = this.element1.date;
        const comment = this.element1.comment;
        this.cardsService.replaceCard(this.board.my_board._id, this.board.my_column._id, { name, description, date, comment } as Task)
          .subscribe(card => {})
      }
      else{
        if(this.board.my_task._id == element._id) {
          console.log(element)
          this.element1 = element;
          const name = this.element1.name;
          const description = this.element1.description;
          const date = this.element1.date;
          const comment = this.element1.comment;
          this.cardsService.replaceCard(this.board._id, this.board.my_column._id, { name, description, date, comment } as Task)
            .subscribe(card => {})
        }
      }
      
    });
  }

}


