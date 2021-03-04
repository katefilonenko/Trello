import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
import { CardsService } from '../services/cards.service';
import { Task } from '../models/tasks';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
 

  constructor(
    private boardsService: BoardsService,
    private columnsService: ColumnsService,
    private cardsService: CardsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    // public loaderService: LoaderService,
    private toastr: ToastrService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getBoard(this.route.snapshot.paramMap.get('id'))
  }

  refreshPage() {
    window.location.reload();
  }

  board: any;
  columns:Array<any>;
  length=[];
  dlinaMassivov=[];
  getBoard(id){
    this.boardsService.getBoard(id)
    .subscribe(board => {
      this.board = board;
      this.columns = this.board.columns;
      this.columns.forEach(element => {
        this.length.push(element.tasks)
        // console.log(this.length)
      });
      console.log(board);
      console.log(this.columns);
      this.length.forEach(element => {
        // console.log(element.length);
        this.dlinaMassivov.push(element.length);
        
      });
    })
    // console.log(this.dlinaMassivov)
  }

  onCreateCard(column){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "460px";
    dialogConfig.height = "420px";
    dialogConfig.data = {
      my_board : this.board,
      my_column : column
    };
    this.dialog.open(CardCreateComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.refreshPage()
    })
  }

  onCreateColumn(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "300px";
    dialogConfig.height = "250px";
    dialogConfig.data = this.board;
    this.dialog.open(ColumnAddComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.refreshPage()
    })
  }


  deleteSuccess() {
    this.toastr.success('Deleted', 'Success');
  }

  deleteError(){
    this.toastr.error('Not deleted', 'Major Error');
  }

  deleteColumn(column){
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.columnsService.deleteColumn(this.board._id, column._id)
          .subscribe(res => {
            console.log(column._id);
            this.deleteSuccess();
            this.refreshPage();
          }, err => {
            this.deleteError();
          })
      }
    })
  }

  deleteCard(column, task){
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.cardsService.deleteCard(this.board._id, column._id, task._id)
          .subscribe(res => {
            console.log(column._id);
            console.log(task._id);
            this.deleteSuccess();
            this.refreshPage();
          }, err => {
            this.deleteError();
          })
      }
    })
  }

  onEditCard(column, task){
    this.cardsService.populateForm(task);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "460px";
    dialogConfig.height = "420px";
    dialogConfig.data = {
      my_board: this.board,
      my_column: column,
      my_task: task
    }
    this.dialog.open(CardEditComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.refreshPage();
    })
  }

  column:any;
  onEditColumn(column){
    this.columnsService.populateForm(column);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "300px";
    dialogConfig.height = "250px";
    dialogConfig.data = {
      my_board: this.board,
      my_column: column
    };
    this.dialog.open(ColumnEditComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.refreshPage()
      
    })
  }

  index: any;
  item:any;
  tasksArray: any;
  previousColumnTasks: any;
  ID:any;
  length2=[];
  dlinaMassivov2=[];
  my_element:any;
  my_element2:any;
  primer:any;
  ID2:any;
  drop(event: CdkDragDrop<string[]>, column) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.columnsService.populateForm(column); //в какую колонку перемащаем
      this.item = column.tasks[event.currentIndex] //какую карточку перемещаем
      
      this.columns.forEach(element => {
        this.length2.push(element.tasks)
      });
      this.length2.forEach(element => {
        this.dlinaMassivov2.push(element.length);
        
      });
      console.log(this.dlinaMassivov);
      console.log(this.dlinaMassivov2);
      
      this.previousColumnTasks = event.previousContainer.data; //массив с тасками из предыдущей колонки
      // console.log(this.previousColumnTasks); 

      if (this.previousColumnTasks == 0) {
        for (let n = 0; n <= this.dlinaMassivov.length; n++) {
          if (this.dlinaMassivov2[n] < this.dlinaMassivov[n]) {
            this.primer = this.dlinaMassivov2.indexOf(this.dlinaMassivov2[n]);
          };
        }
        this.ID2 = this.columns[this.primer]._id; //откуда перетащили
        this.cardsService.deleteCard(this.board._id, this.ID2, this.item._id)
        .subscribe(res => {
          this.replaceCardByID2(column);
        });
      } else {
        this.columns.forEach(element => {
          console.log(element)
          if (element.tasks[0].name == this.previousColumnTasks[0].name) {
            this.ID = element._id; //откуда перетащили
            this.cardsService.deleteCard(this.board._id, this.ID, this.item._id)
            .subscribe(rer => {
              this.replaceCardByID(column);
            });
          }      
        });
      }
    }
  }

  replaceCardByID2(column){
    var name = this.item.name;
    var description = this.item.description;
    var date = this.item.date;
    var comment = this.item.comment;
    this.cardsService.replaceCard(this.board._id, column._id, { name, description, date, comment } as Task)
    .subscribe(res => {
      this.refreshPage();
    })

  }

  replaceCardByID(column){
    var name = this.item.name;
    var description = this.item.description;
    var date = this.item.date;
    var comment = this.item.comment;
    this.cardsService.replaceCard(this.board._id, column._id, { name, description, date, comment } as Task)
    .subscribe(res => {
      this.refreshPage();
    })
  }
}
