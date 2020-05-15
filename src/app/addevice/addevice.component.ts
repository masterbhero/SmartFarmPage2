import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addevice',
  templateUrl: './addevice.component.html',
  styleUrls: ['./addevice.component.css']
})
export class AddeviceComponent implements OnInit {

  url:any;
  user_id:any;
  postbody:any;
  constructor(private router:Router,private http:HttpClient,public dialog: MatDialog) { 
    this.url = window.location.href;
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

  AddNewPlot(Name:HTMLInputElement,ControllerCode:HTMLInputElement){
    let add_plot_plotconfig = 'http://localhost:3000/combine/add_plot_plotconfig';
    let update_controller_plot = 'http://localhost:3000/combine/update_controller_plot';
    this.postbody = {
      "RegisterID" : ControllerCode.value,
	    "plotname" : Name.value,
      "UserID" : this.user_id
    }
    //console.log(this.postbody);
    this.http.post(add_plot_plotconfig,this.postbody).subscribe(result => {
      //console.log(result);
      this.postbody = {
        "Plot_id" : result['Plot_id'],
        "PlotConfig_id" : result['PlotConfig_id'],
        "User_id" : this.user_id,
        "Controller_id" : result['Controller_id']
      }
      //console.log(this.postbody)
      this.http.put(update_controller_plot,this.postbody).subscribe(result => {
        //console.log(result);
      })
    })
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
