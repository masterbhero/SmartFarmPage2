import { HttpRequestService } from './../http-request.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-addevice',
  templateUrl: './addevice.component.html',
  styleUrls: ['./addevice.component.css']
})
export class AddeviceComponent implements OnInit {

  url:any;
  user_id:any;
  postbody:any;
  result:any;

  constructor(private router:Router,private http:HttpClient,public dialog: MatDialog,private httpRequestService:HttpRequestService) { 
    this.url = window.location.href;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      height: '300px',
      data:{
        result: this.result
      }
    });
    // /managedevice;id=5ea7eb0cca5b9657ac4be27a
    dialogRef.afterClosed().subscribe(result => {
      if(this.result == 'success'){
        this.router.navigateByUrl('/managedevice;id='+this.user_id);
      }
    });
  }

  ngOnInit(): void {
    this.url = this.url.split("=", 2); 
    this.user_id = this.url[1];
    this.httpRequestService.GetUserData().subscribe(result => {
      //console.log(result)
    })
  }

  GetResult(){
    return this.result;
  }

  AddNewPlot(Name:HTMLInputElement,ControllerCode:HTMLInputElement){
    //console.log(Name.value);
    //console.log(ControllerCode.value);
    //console.log(this.user_id);
    if(Name.value == '' || Name.value == null || ControllerCode.value == '' || Name.value == null){
      //console.log('ไม่ครบ')
      this.result = 'ข้อมูลไม่ครบ';
      this.openDialog();
    }else{
      //console.log('ครบ')
      let add_plot_plotconfig = 'http://localhost:3000/combine/add_plot_plotconfig';
      let update_controller_plot = 'http://localhost:3000/combine/update_controller_plot';
      this.postbody = {
        "RegisterID" : ControllerCode.value,
        "plotname" : Name.value,
        "UserID" : this.user_id
      }
      this.httpRequestService.AddPlotAndPlotConfig(this.postbody).subscribe(result => {
        //console.log(result);  
        //console.log(this.postbody)
        if(result['status'] == 'RegisterID not found'){
          //console.log("RegisterID not found");
          this.result = 'RegisterID not found';
        }
        else if(result['status'] == 'already have owner'){
          //console.log("already have owner");
          this.result = 'already have owner';
        }
        else if(result['status'] == 'created'){
          //console.log("created");
          let ID = result['ID'];
          this.postbody = {
            "Plot_id" : ID['Plot_id'],
            "PlotConfig_id" : ID['PlotConfig_id'],
            "User_id" : this.user_id,
            "Controller_id" : ID['Controller_id']
          }  
          //console.log(this.postbody)
          this.httpRequestService.UpdateControllerAndPlot(this.postbody).subscribe(result => {

          })
          this.result = 'success';
          //console.log(this.result);
        }
        //console.log(this.result);
        this.openDialog();
      })
    }
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'popup-addevice.html',
})
export class DialogOverviewExampleDialog {

  display:any;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {

  }

  OnInit(): void{
    console.log(this.data)
  }

  onNoClick(): void {
    //this.dialogRef.close();
  }

  Okclick(): void{
    if(this.data.result == 'ข้อมูลไม่ครบ'){
      this.dialogRef.close();
    }
  }

} 
