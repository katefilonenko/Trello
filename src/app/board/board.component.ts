import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
// import { Board } from '../models/board';
// import { Column } from '../models/columns';
import { BoardsService } from '../services/boards.service'
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CardEditComponent } from '../card-edit/card-edit.component';
import { CardCreateComponent } from '../card-create/card-create.component';
import { ColumnAddComponent } from '../column-add/column-add.component';
import { ColumnEditComponent } from '../column-edit/column-edit.component';
import { LoaderService } from '../laoder/loader.service';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../services/dialog.service';
import { ColumnsService } from '../services/columns.service';
import { Boards } from '../models/boards';

// export interface Board {
//   id: Number,
//   name: String,
//   columns: [{
//       id: Number,
//       name: String,
//       tasks: Array<any>
//   }]
// }


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(
    private boardsService: BoardsService,
    private columnsService: ColumnsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    public loaderService: LoaderService,
    private toastr: ToastrService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getBoard(this.route.snapshot.paramMap.get('id'))
  }

  board: any;
  columns:Array<any>;
  id_for_column:any;
  getBoard(id){
    this.boardsService.getBoard(id)
    .subscribe(board => {
      this.board = board;
      this.columns = this.board.columns;
      console.log(board);
      console.log(this.columns);
    })
  }

  onCreateCard(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "420px";
    dialogConfig.height = "420px"
    this.dialog.open(CardCreateComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      
    })
  }

  onCreateColumn(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "420px";
    dialogConfig.height = "420px";
    dialogConfig.data = this.columns;
    this.dialog.open(ColumnAddComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {

    })
  }


  deleteSuccess() {
    this.toastr.success('Deleted', 'Success');
  }

  deleteError(){
    this.toastr.error('Not deleted', 'Major Error');
  }

  // column: any;
  deleteColumn(column){
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.columnsService.deleteColumn(column._id)
          .subscribe(t => {
            console.log(column._id);
            // this.getBoard(id);
            this.deleteSuccess();
          }, err => {
            this.deleteError();
          })
      }
    })
  }

  onEditCard(board){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "460px";
    dialogConfig.height = "420px";
    this.dialog.open(CardEditComponent, dialogConfig);
    // dialogConfig.data = this.columns;
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

  column:any;
  onEditColumn(column){
    this.columnsService.populateForm(column);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "460px";
    dialogConfig.height = "420px";
    // this.columnsService.getColumn(column._id)
    // .subscribe(column=> { 
    //   this.column = column;
    //   dialogConfig.data = column;
    //   console.log(dialogConfig.data);
    //   this.dialog.open(ColumnEditComponent, dialogConfig);
    // })
    dialogConfig.data = column;
    console.log(dialogConfig.data);
    this.dialog.open(ColumnEditComponent, dialogConfig);
    
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
