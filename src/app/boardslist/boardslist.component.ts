import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../services/boards.service';
import { Router } from '@angular/router';
import { Boards } from '../models/boards';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BoardCreateComponent } from '../board-create/board-create.component';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../laoder/loader.service';
import { DialogService } from '../services/dialog.service';
import { BoardEditComponent } from '../board-edit/board-edit.component';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-boardslist',
  templateUrl: './boardslist.component.html',
  styleUrls: ['./boardslist.component.scss']
})
export class BoardslistComponent implements OnInit {

  boards: any;
  name: string;
  private searchTerms = new Subject<string>();

  constructor(
    private boardsService: BoardsService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    // public loaderService: LoaderService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards(){
    this.boardsService.getBoards()
    .subscribe(boards => {
      this.boards = boards;
      // console.log(boards)
    });
  }
  
  Search(){
    if(this.name != ""){
      this.boards = this.boards.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }else if (this.name == ""){
      this.ngOnInit();
    }
 
  }

  applyFilter(filterValue: string) {
    console.log('fghjk')
    this.boards.filter = filterValue.trim().toLowerCase();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "300px";
    dialogConfig.height = "250px";
    this.dialog.open(BoardCreateComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.getBoards();
    })
  }

  updateBoard(board){
    this.boardsService.populateForm(board);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "300px";
    dialogConfig.height = "250px";
    this.boardsService.getBoard(board._id)
    .subscribe(board => {
      this.board = board;
      dialogConfig.data = board;
      this.dialog.open(BoardEditComponent, dialogConfig);
    })
    this.dialog.afterAllClosed.subscribe(res => {
      this.getBoards();
    })
  }

  deleteSuccess() {
    this.toastr.success('Deleted', 'Success');
  }

  deleteError(){
    this.toastr.error('Not deleted', 'Major Error');
  }

  board: any;

  deleteBoard(board) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res) {
          // console.log('hiii')
          this.boardsService.deleteBoard(board._id)
            .subscribe(t => {
              this.getBoards();
              this.deleteSuccess();
            }, err => {
              this.deleteError();
            })
        }
      })
  }

  onSelect(board){
    this.router.navigate(['/allboards', board.id])
  }

}
