import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.scss']
})
export class CardCreateComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CardCreateComponent>,
  ) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

}
