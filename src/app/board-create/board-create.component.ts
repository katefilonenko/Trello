import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-board-create',
  templateUrl: './board-create.component.html',
  styleUrls: ['./board-create.component.scss']
})
export class BoardCreateComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BoardCreateComponent>
  ) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }
}
