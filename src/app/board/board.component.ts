import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
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
import { Chart } from 'angular-highcharts';
import { element } from 'protractor';
import * as Highcharts from 'highcharts';


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
    this.getBoard(this.route.snapshot.paramMap.get('id'));
  }

  refreshPage() {
    window.location.reload();
  }

  board: any;
  columns: Array<any>;
  length = [];
  dlinaMassivov = [];
  getBoard(id) {
    this.boardsService.getBoard(id)
      .subscribe(board => {
        this.board = board;
        this.columns = this.board.columns;
        this.columns.forEach(element => {
          this.length.push(element.tasks)
          // console.log(this.length)
        });
        console.log(this.board);
        console.log(this.columns);
        this.length.forEach(element => {
          this.dlinaMassivov.push(element.length);
        });
      })
  }


  onCreateCard(column) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "460px";
    dialogConfig.height = "420px";
    dialogConfig.data = {
      my_board: this.board,
      my_column: column
    };
    this.dialog.open(CardCreateComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.ngOnInit();
    })
  }

  onCreateColumn() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "300px";
    dialogConfig.height = "250px";
    dialogConfig.data = this.board;
    this.dialog.open(ColumnAddComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.ngOnInit();
    })
  }


  deleteSuccess() {
    this.toastr.success('Deleted', 'Success');
  }

  deleteError() {
    this.toastr.error('Not deleted', 'Major Error');
  }

  deleteColumn(column) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.columnsService.deleteColumn(this.board._id, column._id)
            .subscribe(res => {
              // console.log(column._id);
              this.deleteSuccess();
              this.ngOnInit();
            }, err => {
              this.deleteError();
            })
        }
      })
  }

  deleteCard(column, task) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.cardsService.deleteCard(this.board._id, column._id, task._id)
            .subscribe(res => {
              console.log(column._id);
              console.log(task._id);
              this.deleteSuccess();
              this.ngOnInit();
            }, err => {
              this.deleteError();
            })
        }
      })
  }

  new_id:any;
  new_Arr:any;
  onEditCard(column, task) {
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
      this.ngOnInit();
      
      // this.new_Arr = this.columns;
      // this.new_id = column._id
      // console.log(this.new_Arr, this.new_id);
      // this.deletePrevious1();
    })
  }

  // element3;
  // addNew1() {
  //   console.log(this.newArray)
  //   this.new_Arr.forEach(element => {
  //     if(element._id == this.new_id){

  //     }
  //     this.element3 = element;
  //     var name = this.element3.name;
  //     var description = this.element3.description;
  //     var date = this.element3.date;
  //     var comment = this.element3.comment;
  //     this.cardsService.replaceCard(this.board._id, column._id, { name, description, date, comment } as Task)
  //       .subscribe(card => {
  //         this.ngOnInit();
  //         // this.findDubl();
  //       })
  //   })
  // }

  my_tasks=[];
  element4;
  columnElement:any;
  deletePrevious1() {
    this.new_Arr.forEach(element => {
      if(element._id == this.new_id){
        this.columnElement = element;
        this.my_tasks = element.tasks;
      }
    });
    console.log(this.my_tasks);
    // this.my_tasks.forEach(element => {
    //   // console.log(element)
    //   this.element4 = element;
    //   console.log(this.element4)
    //   this.cardsService.deleteCard(this.board._id, this.columnElement._id, this.element4._id)
    //   .subscribe(res => {
    //   })
    // })
    // this.addNew1()

  }

  column: any;
  onEditColumn(column) {
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
      // this.refreshPage()
      this.ngOnInit();
    })
  }

  item: any;
  previousColumnTasks: any;
  ID: any;
  length2 = [];
  dlinaMassivov2 = [];
  primer: any;
  ID2: any;
  myColumn: any;
  newIndex: any;
  newArray = [];
  drop(event: CdkDragDrop<string[]>, column) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.previousIndex, event.currentIndex, column);
      this.newArray = event.container.data
      this.deletePrevious(column)
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      console.log(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex, column);

      this.newArray = event.container.data
      this.myColumn = column;
      this.newIndex = event.currentIndex;
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
        // this.addNew(column);
        this.cardsService.deleteCard(this.board._id, this.ID2, this.item._id)
          .subscribe(res => {
            this.deletePrevious(column)
            // this.replaceCardByID2(column);
          });
      } else {
        this.columns.forEach(element => {
          if (element.tasks[0].name == this.previousColumnTasks[0].name) {
            this.ID = element._id; //откуда перетащили
            // this.addNew(column);
            this.cardsService.deleteCard(this.board._id, this.ID, this.item._id)
              .subscribe(rer => {
                this.deletePrevious(column)
                // this.replaceCardByID(column);
              });
          }
        });
      }
    }
  }

  // replaceCardByID2(column) {
  //   var name = this.item.name;
  //   var description = this.item.description;
  //   var date = this.item.date;
  //   var comment = this.item.comment;
  //   this.cardsService.replaceCard(this.board._id, column._id, { name, description, date, comment } as Task)
  //     .subscribe(res => {
  //       // this.myColumn.tasks.splice(this.newIndex, 0, res)
  //       this.ngOnInit();
  //     })
  // }

  element1;
  addNew(column) {
    console.log(this.newArray)
    this.newArray.forEach(element => {
      // console.log(element)
      // console.log(element)
      this.element1 = element;
      // this.item = column.tasks[this.newIndex]
      var name = this.element1.name;
      var description = this.element1.description;
      var date = this.element1.date;
      var comment = this.element1.comment;
      this.cardsService.replaceCard(this.board._id, column._id, { name, description, date, comment } as Task)
        .subscribe(card => {
          this.ngOnInit();
          // this.findDubl();
        })
    })
   
    
  }

  element2;
  deletePrevious(column) {
    this.newArray.forEach(element => {
      // console.log(element)
      this.element2 = element;
      console.log(this.element2)
      this.cardsService.deleteCard(this.board._id, column._id, this.element2._id)
      .subscribe(res => {
      })
    })
    this.addNew(column)

  }

  // replaceCardByID(column) {
  //   var name = this.item.name;
  //   var description = this.item.description;
  //   var date = this.item.date;
  //   var comment = this.item.comment;
  //   this.cardsService.replaceCard(this.board._id, column._id, { name, description, date, comment } as Task)
  //     .subscribe(res => {
  //       // column.tasks.splice(this.newIndex, 0, this.item)
  //       // console.log(column)
  //       this.ngOnInit();
  //     })
  // }
}
