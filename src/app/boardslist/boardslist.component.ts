import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../services/boards.service';
import { Router } from '@angular/router';
import { Boards } from '../models/boards';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BoardCreateComponent } from '../board-create/board-create.component';

@Component({
  selector: 'app-boardslist',
  templateUrl: './boardslist.component.html',
  styleUrls: ['./boardslist.component.scss']
})
export class BoardslistComponent implements OnInit {

  boards: any;

  constructor(
    private boardsService: BoardsService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards(){
    this.boardsService.getBoards()
    .subscribe(boards => {
      this.boards = boards;
      console.log(boards)
    })
  }

  addBoard(name: string){
    this.boardsService.addBoard({name} as Boards)
    .subscribe(board => {
      
    })
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "60%";
    this.dialog.open(BoardCreateComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.getBoards();
      // console.log(this.people2.length);
      // if(this.people2.length > this.lengthOfSecondArr){
      //   console.log('erjb')
      //   this.statistics();
      //   this.usersLastMonth();
      // }
      // this.getInfoForSecondArr();
    })
  }

  onSelect(board){
    this.router.navigate(['/allboards', board.id])
  }

}
