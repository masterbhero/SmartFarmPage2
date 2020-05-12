import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addevice',
  templateUrl: './addevice.component.html',
  styleUrls: ['./addevice.component.css']
})
export class AddeviceComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      height: '300px'
    });
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'popup-addevice.html',
})
export class DialogOverviewExampleDialog {

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
