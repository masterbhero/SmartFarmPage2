import { Router } from '@angular/router';
import { HttpRequestService } from './../http-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plotconfig',
  templateUrl: './plotconfig.component.html',
  styleUrls: ['./plotconfig.component.css']
})
export class PlotconfigComponent implements OnInit {

  url: any;
  plot_id: any;
  postbody: any;
  PlotConfig: any;
  Plants:any;
  constructor(private httpRequestService:HttpRequestService,private router:Router) { 
  }

  ngOnInit(): void {
    this.Plants = [
      {id: 1, name: "เลือกชนิดผัก"},
      {id: 2, name: "ผักบุ้ง"},
      {id: 3, name: "คะน้า"},
      {id: 4, name: "กะหล่ำปลี"},
      {id: 5, name: "กวางตุ้ง"}
    ];
    this.PlotConfig = {
      name:"",
      dirthumid:"",
      light:""
    }
    this.url = window.location.href;
    this.url = this.url.split("=", 2); 
    this.plot_id = this.url[1]
    this.httpRequestService.GetPlotConfigByPlotID(this.plot_id).subscribe(result =>{
      //console.log(result); 
      this.PlotConfig = result;
    })
  }

  UpdatePlotConfigPlantSetting(name:HTMLInputElement,
    StageOneDate:HTMLInputElement,StageOneDirthumid:HTMLInputElement,StageOnelight:HTMLInputElement,
    StageTwoDate:HTMLInputElement,StageTwoDirthumid:HTMLInputElement,StageTwolight:HTMLInputElement,
    StageThreeDate:HTMLInputElement,StageThreeDirthumid:HTMLInputElement,StageThreelight:HTMLInputElement){

    if(name.value != "" && StageOneDate.value != "" && StageOneDirthumid.value != "" && StageOnelight.value != ""
                        && StageTwoDate.value != "" && StageTwoDirthumid.value != "" && StageTwolight.value != ""
                        && StageThreeDate.value != "" && StageThreeDirthumid.value != "" && StageThreelight.value != ""){
      if(parseInt(StageOneDate.value) < parseInt(StageTwoDate.value) && parseInt(StageOneDate.value) < parseInt(StageThreeDate.value) 
          && parseInt(StageTwoDate.value) < parseInt(StageThreeDate.value) ){                   
        this.postbody = {
          "name":name.value,
          "StageOneDate":parseInt(StageOneDate.value).toString(),
          "StageOneDirthumid":parseInt(StageOneDirthumid.value).toString(),
          "StageOnelight":parseInt(StageOnelight.value).toString(),
          "StageTwoDate":parseInt(StageTwoDate.value).toString(),
          "StageTwoDirthumid":parseInt(StageTwoDirthumid.value).toString(),
          "StageTwolight":parseInt(StageTwolight.value).toString(),
          "StageThreeDate":parseInt(StageThreeDate.value).toString(),
          "StageThreeDirthumid":parseInt(StageThreeDirthumid.value).toString(),
          "StageThreelight":parseInt(StageThreelight.value).toString(),
          "id":this.PlotConfig['_id']
        }
        //console.log(this.postbody)
        this.httpRequestService.UpdatePlotConfigPlantSetting(this.postbody).subscribe(result => {
          console.log(result);
          this.router.navigate(['/plotmenu',{id:this.plot_id}]);
        })
      }
      else{
        alert("กรุณาใส่วันที่ให้ถูกต้อง")
      }
    }
    else{
      alert("กรุณาใส่ข้อมูลให้ครบ")
    }
  }

  //devices = 'one two three'.split(' ');
  //selectedDevice = 'two';
  onChange(newValue) {
    console.log(newValue);
    //this.selectedDevice = newValue;
    // ... do other stuff here ...
  }
}
