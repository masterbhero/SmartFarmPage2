import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-managedevice',
  templateUrl: './managedevice.component.html',
  styleUrls: ['./managedevice.component.css']
})
export class ManagedeviceComponent implements OnInit {

  url: any;
  user_id: any;
  plot: any;

  constructor(public dialog: MatDialog) { 
    this.url = window.location.href;
    this.plot = {
      name:['plot1'],
      _id:['someid']
    }
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      height: '300px'
    });
  }

  ngOnInit(): void {
    this.url = this.url.split("=", 2); 
    this.user_id = this.url[1];
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'popup-mangedevice.html',
})
export class DialogOverviewExampleDialog {

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
