import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss']
})
export class CardEditComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CardEditComponent>,
  ) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

}
