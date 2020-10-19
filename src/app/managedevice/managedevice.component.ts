import { HttpRequestService } from './../http-request.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  plot_id: any;

  constructor(public dialog: MatDialog,private http:HttpClient,private httpRequestService:HttpRequestService) { 
    this.url = window.location.href;
    this.url = this.url.split("=", 2); 
    this.user_id = this.url[1];
    this.httpRequestService.GetUserData().subscribe(result => {
      this.httpRequestService.GetPlotByUser(this.user_id).subscribe(result => {
        this.plot = result;
      })
    })
  }
  
  openDialog(plotid: any,plotname: any): void {
    //console.log(plotid.value)
    //this.plot_id = plotid.value;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      height: '300px',
      data: {
        plot_id: plotid.value,
        plot_name: plotname.value
      }
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

  postbody: any;

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,private httpRequestService:HttpRequestService) { }

  ngOnInit() {
    // will log the entire data object
    //console.log(this.data)
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(){
    this.postbody = {
      Plot_id:this.data.plot_id
    }
    //console.log(this.postbody)
    this.httpRequestService.RemoveFromUser(this.postbody).subscribe(result => {      
      //console.log(result)
      window.location.reload();
      this.dialogRef.close();
    })
  }

  closeModal() : void {
    window.location.reload();
  } 

}
