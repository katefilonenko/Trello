import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from '../models/board';
import { Column } from '../models/columns';
import { BoardsService } from '../services/boards.service'
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BoardEditComponent } from '../board-edit/board-edit.component';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  // board: Board = new Board('Test Board', [
  //   new Column('Ideas', [
  //     "Some random idea",
  //     "This is another random idea",
  //     "build an awesome application"
  //   ]),
  //   new Column('Research', [
  //     "Lorem ipsum",
  //     "foo",
  //     "This was in the 'Research' column"
  //   ]),
  //   new Column('Todo', [
  //     'Get to work',
  //     'Pick up groceries',
  //     'Go home',
  //     'Fall asleep'
  //   ]),
  //   new Column('Done', [
  //     'Get up',
  //     'Brush teeth',
  //     'Take a shower',
  //     'Check e-mail',
  //     'Walk dog'
  //   ])
  // ]);

  // board1: Board = new Board('djnfhmkfh', [
  //   new Column('Ideas', [
  //     "Some random idea",
  //     "This is another random idea",
  //     "build an awesome application"
  //   ]),
  //   new Column('Research', [
  //     "Lorem ipsum",
  //     "foo",
  //     "This was in the 'Research' column"
  //   ]),
  //   new Column('Todo', [
  //     'Get to work',
  //     'Pick up groceries',
  //     'Go home',
  //     'Fall asleep'
  //   ]),
  //   new Column('Done', [
  //     'Get up',
  //     'Brush teeth',
  //     'Take a shower',
  //     'Check e-mail',
  //     'Walk dog'
  //   ])
  // ]);


  constructor(
    private boardsService: BoardsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getBoard(this.route.snapshot.paramMap.get('id'))
  }

  boards:any;
  columns:any;
  getBoard(id){
    this.boardsService.getBoard(id)
    .subscribe(boards => {
      this.boards = boards;
      this.columns = boards.columns;
      console.log(boards);
      console.log(this.columns);
    })
  }

  // @Input() board: Board;

  board:any;
  onEdit(board){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "420px";
    dialogConfig.height = "420px";
    this.dialog.open(BoardEditComponent, dialogConfig);
    dialogConfig.data = this.columns;
    console.log(dialogConfig.data);
    // this.boardsService.getBoard(board.id)
    // .subscribe(board => {
    //   this.board = board;
    //   this.dialog.open(BoardEditComponent, dialogConfig);
    //   dialogConfig.data = board.columns;
    //   // console.log(dialogConfig.data);
    //   this.dialog.afterAllClosed.subscribe( res => {
    //     console.log(board.columns);
    //     console.log('The dialog was closed');
    //     // this.getBoard(board.id);
    //   })
    // })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
