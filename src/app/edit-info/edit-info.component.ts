import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss']
})
export class EditInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditInfoComponent>,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  editSuccess() {
    this.toastr.success('Updated', 'Success');
  }

  editError(){
    this.toastr.error('Something went wrong!', 'Major Error');
  }

  onClose() {
    this.dialogRef.close();
  }

}
