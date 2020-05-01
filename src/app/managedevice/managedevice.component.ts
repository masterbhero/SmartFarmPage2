import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-managedevice',
  templateUrl: './managedevice.component.html',
  styleUrls: ['./managedevice.component.css']
})
export class ManagedeviceComponent implements OnInit {

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
  templateUrl: 'popup-mangedevice.html',
})
export class DialogOverviewExampleDialog {

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
