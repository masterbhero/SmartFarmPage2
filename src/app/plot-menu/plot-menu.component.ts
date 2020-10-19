import { HttpRequestService } from './../http-request.service';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { SocketIoService } from '../socket-io.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { element } from 'protractor';

@Component({
  selector: 'app-plot-menu',
  templateUrl: './plot-menu.component.html',
  styleUrls: ['./plot-menu.component.css']
})
export class PlotMenuComponent implements OnInit {

  light:any;
  temp:any;
  dirt_moisure:any;
  air_moisure:any;
  user_id:any;
  url: any;
  controller_id: any;
  plot_id: any;
  plot_name: any;
  plotconfig_id:any;
  postbody:any;
  CurrentDate: any;
  CreatedDate:any;
  HarvestDay:any;
  Lastet_Harvest:any;
  waterpump_status:any;
  slan_status:any;
  constructor(public dialog: MatDialog,private socketIoService:SocketIoService,private http:HttpClient,private httpRequestService:HttpRequestService) {

  }

  ngOnInit(): void {
    this.light = "Nan";
    this.temp = "Nan";
    this.dirt_moisure = "Nan";
    this.air_moisure = "Nan";
    this.waterpump_status = "Nan";
    this.slan_status = "Nan";
    this.url = window.location.href;
    this.url = this.url.split("=", 2); 
    this.plot_id = this.url[1];
    //console.log(this.plot_id)
    this.httpRequestService.GetUserData().subscribe(result => {
      this.httpRequestService.GetPlotByPlot(this.plot_id).subscribe((result) => {
          //console.log(result);
          this.controller_id = result['Controller_id'];
          this.CreatedDate = result['CreatedDate'];
          this.plot_name = result['name'];
          this.user_id = result['User_id'];
          this.CreatedDate = result['CreatedDate']
          
          //console.log(this.user_id)
          this.httpRequestService.GetPlotConfigByPlotID(result['_id']).subscribe((result) =>{
            //console.log(result)
            this.plotconfig_id = result['_id'];
            this.Lastet_Harvest = result['Lastest_harvest_date'];
            //console.log(this.Lastet_Harvest)
            this.HarvestDay = new Date(result['Lastest_harvest_date']).getTime() + (result['harvest_day']*24*60*60*1000);
            //console.log(this.HarvestDay)
            this.MakeWaterpumpStatus(result);
            this.MakeSlanStatus(result);
            //console.log(this.waterpump_status);
            this.httpRequestService.GetLastedSensordataByID(this.controller_id).subscribe((result) => {
              //console.log(result)
              this.light = result[0]['light'];
              this.temp = result[0]['temp'];    
              this.dirt_moisure = result[0]['dirthumid'];
              this.air_moisure = result[0]['airhumid'];
              this.CurrentDate = result[0]['CreatedDate']; 
              this.socketIoService.listen('chat message',this.user_id).subscribe((data) => {
                //this.socketIoService.listen('join room',this.user_id).subscribe((data) => {
                  //console.log(data)
                  if(data['sender'] == this.url[1]){  
                    this.light = data['light'];
                    this.temp = data['temp'];    
                    this.dirt_moisure = data['dirt'];
                    this.air_moisure = data['air'];
                    this.CurrentDate = new Date();
                  }
                })          
            })
          })
      })
    })
  }

  MakeWaterpumpStatus(result : any){
    //console.log(result);
    if(result['waterpump_status'] == "Auto"){
      this.waterpump_status = "อัติโนมัติ"
    }else if(result['waterpump_status'] == "On"){
      this.waterpump_status = "ทำงาน"
    }else if(result['waterpump_status'] == "Off"){
      this.waterpump_status = "ปิด"
    }
    // if(result.InstaWaterOn == "true" || result.InstaWaterOff == "true"){
    //   if(result['InstaWaterOn'] == "true"){
    //     this.waterpump_status = "ทำงานทันที";
    //   }else if(result['InstaWaterOff'] == "true"){
    //     this.waterpump_status = "หยุดทันที";
    //   }
    // }else{
    //   if(result['waterpump_status'] == "true"){
    //     this.waterpump_status = "ทำงาน";
    //   }else{
    //     this.waterpump_status = "หยุด";
    //   }
    // }
  }

  MakeSlanStatus(result : any){
    if(result['slan_status'] == "Auto"){
      this.slan_status = "อัติโนมัติ"
    }else if(result['slan_status'] == "On"){
      this.slan_status = "ทำงาน"
    }else if(result['slan_status'] == "Off"){
      this.slan_status = "ปิด"
    }
  }

  TurnOnWaterpump(){
    this.postbody = {
      id:this.plotconfig_id,
      waterpump_status:"true"
    }
    this.httpRequestService.UpdateWaterpumpStatus(this.postbody).subscribe((result) => {
      if(result['waterpump_status'] == "true"){
        this.waterpump_status = "ทำงาน";
      }else{
        this.waterpump_status = "หยุด";
      }
    })
  }

  TurnWaterAuto(){
    this.postbody = {
      id:this.plotconfig_id,
      waterpump_status:"Auto"
    }
    this.httpRequestService.UpdateWaterpumpStatus(this.postbody).subscribe((result) => {
      this.waterpump_status = "อัติโนมัติ";
    })
  }

  TurnWaterOn(){
    this.postbody = {
      id:this.plotconfig_id,
      waterpump_status:"On"
    }
    this.httpRequestService.UpdateWaterpumpStatus(this.postbody).subscribe((result) => {
      this.waterpump_status = "ทำงาน";
    })
  }

  TurnWaterOff(){
    this.postbody = {
      id:this.plotconfig_id,
      waterpump_status:"Off"
    }
    this.httpRequestService.UpdateWaterpumpStatus(this.postbody).subscribe((result) => {
      this.waterpump_status = "ปิด";
    })
  }

  TurnLightAuto(){
    this.postbody = {
      id:this.plotconfig_id,
      slan_status:"Auto"
    }
    this.httpRequestService.UpdateSlanStatus(this.postbody).subscribe((result) => {
      this.slan_status = "อัติโนมัติ";
    })
  }

  TurnLightOn(){
    this.postbody = {
      id:this.plotconfig_id,
      slan_status:"On"
    }
    this.httpRequestService.UpdateSlanStatus(this.postbody).subscribe((result) => {
      this.slan_status = "เปิด";
    })
  }

  TurnLightOff(){
    this.postbody = {
      id:this.plotconfig_id,
      slan_status:"Off"
    }
    this.httpRequestService.UpdateSlanStatus(this.postbody).subscribe((result) => {
      this.slan_status = "ปิด";
    })
  }

  InstaOnWaterpump(){
    this.postbody = {
      id:this.plotconfig_id,
      InstaWaterOn : "true",
      InstaWaterOff : "false"
    }
    this.httpRequestService.UpdateInstaWater(this.postbody).subscribe((result) => {
      this.waterpump_status = "ทำงานทันที";
    })
  }

  TurnOffWaterpump(){
    this.postbody = {
      id:this.plotconfig_id,
      waterpump_status:"false"
    }
    this.httpRequestService.UpdateWaterpumpStatus(this.postbody).subscribe((result) => {
      if(result['waterpump_status'] == "true"){
        this.waterpump_status = "ทำงาน";
      }else{
        this.waterpump_status = "หยุด";
      }
    })
  }

  InstaOffWaterpump(){
    this.postbody = {
      id:this.plotconfig_id,
      InstaWaterOn : "false",
      InstaWaterOff : "true"
    }
    this.httpRequestService.UpdateInstaWater(this.postbody).subscribe((result) => {
      console.log(result)
    })
  }

  TurnOnSlan(){
    this.postbody = {
      id:this.plotconfig_id,
      slan_status:"true"
    }
    this.httpRequestService.UpdateSlanStatus(this.postbody).subscribe((result) => {
      if(result['slan_status'] == "true"){
        this.slan_status = "ทำงาน";
      }else{
        this.slan_status = "หยุด";
      }
    })
  }

  TurnOffSlan(){
    this.postbody = {
      id:this.plotconfig_id,
      slan_status:"false"
    }
    this.httpRequestService.UpdateSlanStatus(this.postbody).subscribe((result) => {
      if(result['slan_status'] == "true"){
        this.slan_status = "ทำงาน";
      }else{
        this.slan_status = "หยุด";
      }
    })
  }

  Harvest(){
    this.postbody = {
      id:this.plotconfig_id
    }
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      height: '300px',
      data: {
        postbody:this.postbody
      }
    });
  }

  disconnected(){
    //console.log("disconnected")
    this.socketIoService.disconnect();
  }

  // ngOnDestroy(){
  //   console.log(this.socketIoService.Status());
  //   //this.socketIoService.disconnect();
  // }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'popup-harvest.html',
})
export class DialogOverviewExampleDialog {

  //postbody: any;

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,private httpRequestService:HttpRequestService) { }

  ngOnInit() {
    // will log the entire data object
    //console.log(this.data.postbody)
  }
  
   onNoClick(): void {
     this.dialogRef.close();
   }

   onYesClick(){
    this.httpRequestService.Harvest(this.data.postbody).subscribe((result) => {
      //console.log(result)
      window.location.reload();
      this.dialogRef.close();
    })
   }

  closeModal() : void {
    window.location.reload();
  } 

}