import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditInfoComponent } from '../edit-info/edit-info.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  imgUrl: string = "/assets/img/men-profile-icon-png-image-free-download-searchpngcom-png-man-grey-715_657.png";
  fileToUpload: File = null;

  constructor(private dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getPearson();
  }

  handleFileInput(file: FileList){
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imgUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  id = "6035353b6c40ef7b6c143617";
  pearson: any;
  getPearson(){
    this.authService.getPearson(this.id)
    .subscribe(pearson => {
      this.pearson = pearson;
    })
    console.log(this.pearson)
  }

  onEdit(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "300px";
    dialogConfig.height = "250px";
    this.dialog.open(EditInfoComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      // this.refreshPage();
    })
  }

}
