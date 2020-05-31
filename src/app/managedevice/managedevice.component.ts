import { HttpRequestService } from './../http-request.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-managedevice',
  templateUrl: './managedevice.component.html',
  styleUrls: ['./managedevice.component.css']
})
export class ManagedeviceComponent implements OnInit {

  url: any;
  user_id: any;
  plot: any;

  constructor(public dialog: MatDialog,private http:HttpClient,private httpRequestService:HttpRequestService) { 
    this.url = window.location.href;
    this.url = this.url.split("=", 2); 
    this.user_id = this.url[1];
    this.httpRequestService.GetPlotByUser(this.user_id).subscribe(result => {
      this.plot = result;
    })
  }
  
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
